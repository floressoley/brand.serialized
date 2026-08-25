import {
  ArrowRight,
  ArrowSquareOut,
  ArrowsClockwise,
  Bell,
  CaretDown,
  ChartLineUp,
  Check,
  CheckCircle,
  Clock,
  Code,
  Coins,
  Copy,
  Database,
  Funnel,
  Gear,
  Globe,
  Lightning,
  Link,
  LockKey,
  MagnifyingGlass,
  ShieldCheck,
  Terminal,
  User,
  Wallet,
  WarningCircle,
  X,
  XCircle,
} from '@phosphor-icons/react'
import type { Icon as IconType } from '@phosphor-icons/react'
import './Icons.css'

const ICONS: { name: string; Icon: IconType }[] = [
  { name: 'ArrowRight', Icon: ArrowRight },
  { name: 'ArrowSquareOut', Icon: ArrowSquareOut },
  { name: 'ArrowsClockwise', Icon: ArrowsClockwise },
  { name: 'Bell', Icon: Bell },
  { name: 'CaretDown', Icon: CaretDown },
  { name: 'ChartLineUp', Icon: ChartLineUp },
  { name: 'Check', Icon: Check },
  { name: 'CheckCircle', Icon: CheckCircle },
  { name: 'Clock', Icon: Clock },
  { name: 'Code', Icon: Code },
  { name: 'Coins', Icon: Coins },
  { name: 'Copy', Icon: Copy },
  { name: 'Database', Icon: Database },
  { name: 'Funnel', Icon: Funnel },
  { name: 'Gear', Icon: Gear },
  { name: 'Globe', Icon: Globe },
  { name: 'Lightning', Icon: Lightning },
  { name: 'Link', Icon: Link },
  { name: 'LockKey', Icon: LockKey },
  { name: 'MagnifyingGlass', Icon: MagnifyingGlass },
  { name: 'ShieldCheck', Icon: ShieldCheck },
  { name: 'Terminal', Icon: Terminal },
  { name: 'User', Icon: User },
  { name: 'Wallet', Icon: Wallet },
  { name: 'WarningCircle', Icon: WarningCircle },
  { name: 'X', Icon: X },
  { name: 'XCircle', Icon: XCircle },
]

const USAGE_RULES = [
  { weight: 'Light', use: 'Default weight — inline with body text, nav items, table cells, buttons at rest.' },
  { weight: 'Fill', use: 'Reserved for active/selected states, alerts, and small high-emphasis moments — badges, status dots, filled toggles.' },
]

export function Icons() {
  return (
    <div>
      <div className="page-body">
        <p className="content__eyebrow">Brand Kit · Icons</p>
        <p className="content__lede">
          Phosphor, in two weights only. Light carries almost everything; Fill is reserved for emphasis — the
          same restraint that keeps color meaningful applies to icon weight too.
        </p>

        <div className="section" id="weights">
          <h2>Weights</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Two of Phosphor's six weights, deliberately — Thin, Regular, Bold, and Duotone are out of scope.
            Never mix weights within the same row or control.
          </p>
          <table className="spec-table">
            <thead>
              <tr>
                <th>Weight</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              {USAGE_RULES.map((rule) => (
                <tr key={rule.weight}>
                  <td>{rule.weight}</td>
                  <td>{rule.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section" id="set">
          <h2>Set</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            A starting set pulled from Phosphor's library, sized for this kit's needs. Pull any other icon
            from the full Phosphor set at the same two weights — nothing here is exhaustive.
          </p>
          <div className="icon-grid">
            {ICONS.map(({ name, Icon }) => (
              <div className="icon-card" key={name}>
                <div className="icon-card__glyphs">
                  <Icon size={24} weight="light" />
                  <Icon size={24} weight="fill" />
                </div>
                <span className="icon-card__name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
