import auditLogoOnDark from '../../../../brand-kit/logo/audit/audit-horizontal-on-dark.svg'
import { Badge, Button, Card, Nav, ShinyButton, Table } from '../../../components'
import { SectionHero } from '../SectionHero'
import './InUse.css'

const auditRows = [
  { token: 'USDC', address: '0xA0b8...eB48', risk: 'pass' as const, riskLabel: 'Low risk', score: '92' },
  { token: 'XYZT', address: '0x9F2c...4a11', risk: 'warning' as const, riskLabel: 'Medium risk', score: '54' },
  { token: 'RUGX', address: '0x1123...9f0d', risk: 'error' as const, riskLabel: 'High risk', score: '11' },
]

export function InUse() {
  return (
    <div>
      <SectionHero />

      <div className="page-body">
      <p className="content__eyebrow">Brand Kit · In Use</p>
      <p className="content__lede">
        The system applied to a SerializedAudit.io-style scan page — components from
        claude-design/components, built on the tokens documented in this kit.
      </p>

      <div className="section" id="scan-page">
        <h2>SerializedAudit.io scan page</h2>
        <div className="app-frame">
          <Nav
            brand={<img src={auditLogoOnDark} alt="Serialized Audit" style={{ height: 22 }} />}
            links={[
              { label: 'Scan', href: '#scan', active: true },
              { label: 'Reports', href: '#reports' },
              { label: 'Docs', href: '#docs' },
            ]}
            actions={
              <Button tone="audit" size="sm">
                Connect wallet
              </Button>
            }
          />
          <div style={{ padding: 'var(--space-8)' }}>
            <div className="preview__grid" style={{ marginBottom: 'var(--space-8)' }}>
              <Card title="Audit summary" description="Contract 0xA0b8...eB48">
                <Badge tone="pass" dot>
                  92 / 100 · Low risk
                </Badge>
              </Card>
              <Card
                title="Liquidity"
                description="Locked for 180 days"
                action={<Badge tone="info">Verified</Badge>}
              >
                No unlock events found in the last 30 days.
              </Card>
            </div>
            <Table>
              <Table.Head>
                <Table.Row>
                  <th>Token</th>
                  <th>Address</th>
                  <th>Risk</th>
                  <th>Score</th>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {auditRows.map((row) => (
                  <Table.Row key={row.address}>
                    <Table.Cell>{row.token}</Table.Cell>
                    <Table.Cell mono>{row.address}</Table.Cell>
                    <Table.Cell>
                      <Badge tone={row.risk} dot>
                        {row.riskLabel}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell mono>{row.score}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>

      <div className="section" id="button">
        <h2>Button</h2>
        <div className="preview__row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="preview__row">
          <Button tone="audit" variant="primary">
            Run audit
          </Button>
          <Button tone="audit" variant="secondary">
            View report
          </Button>
        </div>
        <div className="preview__row">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="preview__row">
          <ShinyButton>Get API Key</ShinyButton>
        </div>
        <p className="preview__caption">ShinyButton — the landing page's special CTA. Reserve it for the landing hero; use the standard Button elsewhere.</p>
      </div>

      <div className="section" id="badge">
        <h2>Badge</h2>
        <div className="preview__row">
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="pass" dot>
            Pass
          </Badge>
          <Badge tone="warning" dot>
            Medium risk
          </Badge>
          <Badge tone="error" dot>
            High risk
          </Badge>
          <Badge tone="info" dot>
            Info
          </Badge>
        </div>
      </div>

      <div className="section" id="cards">
        <h2>Cards</h2>
        <div className="preview__grid">
          <Card title="Contract decompiled" description="Closed-source bytecode, made readable">
            <Badge tone="pass" dot>
              Verified
            </Badge>
          </Card>
          <Card title="Upgrade path open" description="Proxy contract, owner-controlled" action={<Badge tone="warning">Review</Badge>}>
            Implementation can change without a token holder vote.
          </Card>
          <Card title="Unbounded mint" description="No supply cap found" action={<Badge tone="error">High risk</Badge>}>
            Owner can mint additional supply at any time.
          </Card>
        </div>
      </div>

      <div className="section" id="table">
        <h2>Data table</h2>
        <Table>
          <Table.Head>
            <Table.Row>
              <th>Token</th>
              <th>Address</th>
              <th>Risk</th>
              <th>Score</th>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {auditRows.map((row) => (
              <Table.Row key={row.address}>
                <Table.Cell>{row.token}</Table.Cell>
                <Table.Cell mono>{row.address}</Table.Cell>
                <Table.Cell>
                  <Badge tone={row.risk} dot>
                    {row.riskLabel}
                  </Badge>
                </Table.Cell>
                <Table.Cell mono>{row.score}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="section" id="navigation">
        <h2>Navigation</h2>
        <div className="app-frame">
          <Nav
            brand={<img src={auditLogoOnDark} alt="Serialized Audit" style={{ height: 22 }} />}
            links={[
              { label: 'Scan', href: '#scan', active: true },
              { label: 'Reports', href: '#reports' },
              { label: 'Docs', href: '#docs' },
            ]}
            actions={
              <Button tone="audit" size="sm">
                Connect wallet
              </Button>
            }
          />
        </div>
        <p style={{ marginTop: 'var(--space-4)' }}>
          Brand and product logo lockups both work in the nav slot — swap the <code>brand</code> prop for the
          Serialized wordmark on marketing pages, or the Audit lockup on product surfaces.
        </p>
      </div>
      </div>
    </div>
  )
}
