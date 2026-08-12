/**
 * Given a bar's center and the pointer position, compute the angle (in
 * degrees) the bar should rotate to point at the pointer, unwrapped against
 * the bar's previous angle so it never spins the long way round.
 */
export function computeBarAngle(
  centerX: number,
  centerY: number,
  pointerX: number,
  pointerY: number,
  prevAngle: number,
): number {
  const b = pointerX - centerX
  const a = pointerY - centerY
  const c = Math.sqrt(a * a + b * b) || 1
  const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointerY > centerY ? 1 : -1)

  let delta = r - (prevAngle % 360)
  if (delta > 180) delta -= 360
  else if (delta < -180) delta += 360
  return prevAngle + delta
}
