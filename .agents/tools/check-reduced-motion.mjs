#!/usr/bin/env node
/**
 * Prova em browser real que um utilitário `motion-reduce:` vence a cascata.
 * jsdom não carrega o CSS compilado e não consegue ver este defeito
 * (ver `.agents/memory/lessons/002-*.md`); axe-core também não avalia motion.
 *
 * node .agents/tools/check-reduced-motion.mjs [--port 3100] [--base-url <url>]
 *      [--trigger '#projects article button'] [--target '[role="dialog"]']
 */
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const arg = (flag, fallback) => {
	const i = process.argv.indexOf(flag)
	return i === -1 ? fallback : process.argv[i + 1]
}

const port = Number(arg('--port', '3100'))
const remote = arg('--base-url', null)
const base = remote ?? `http://127.0.0.1:${port}`
const trigger = arg('--trigger', '#projects article button')
const target = arg('--target', '[role="dialog"]')

const waitForServer = async (deadlineMs = 120_000) => {
	const until = Date.now() + deadlineMs
	while (Date.now() < until) {
		try {
			const res = await fetch(base, { signal: AbortSignal.timeout(2000) })
			if (res.ok) return true
		} catch {}
		await new Promise((r) => setTimeout(r, 1000))
	}
	throw new Error(`servidor não respondeu em ${base}`)
}

const isUp = async () => {
	try {
		return (await fetch(base, { signal: AbortSignal.timeout(1500) })).ok
	} catch {
		return false
	}
}

let server = null
if (remote) {
	await waitForServer(60_000)
} else if (!(await isUp())) {
	server = spawn('pnpm', ['exec', 'next', 'dev', '-p', String(port)], {
		stdio: 'ignore',
		detached: true,
	})
	await waitForServer()
}

const browser = await chromium.launch()
let exitCode = 0

try {
	const context = await browser.newContext({
		reducedMotion: 'reduce',
		viewport: { width: 1440, height: 900 },
	})
	const page = await context.newPage()
	await page.goto(base, { waitUntil: 'networkidle' })

	const reducedMotionApplied = await page.evaluate(
		() => matchMedia('(prefers-reduced-motion: reduce)').matches,
	)
	if (!reducedMotionApplied) {
		process.exit(1)
	}

	await page.locator(trigger).first().click()
	await page.locator(target).waitFor({ state: 'visible' })

	const elements = {
		[target]: page.locator(target),
		overlay: page.locator('[data-state="open"].inset-0').first(),
	}

	for (const [label, locator] of Object.entries(elements)) {
		const el = await locator.elementHandle()
		const computed = await el.evaluate((node) => ({
			animationName: getComputedStyle(node).animationName,
			transitionProperty: getComputedStyle(node).transitionProperty,
		}))
		const isOk = computed.animationName === 'none'
		console.log(`${isOk ? 'ok' : 'FAIL'} ${label} animationName=${computed.animationName}`)
		if (!isOk) exitCode = 1
	}

	await page.keyboard.press('Escape')
	await page.locator(target).waitFor({ state: 'hidden' })

	await context.close()
} finally {
	await browser.close()
	if (server) process.kill(-server.pid)
}

process.exit(exitCode)
