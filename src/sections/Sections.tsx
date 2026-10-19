import { Check, ExternalLink, Mail, X } from 'lucide-react'
import {
  audit,
  calculator,
  context,
  footer,
  meta,
  opportunity,
  prototype,
  questions,
  validation,
} from '../content'
import { ImpactCalculator } from '../calculator/ImpactCalculator'
import { Prototype } from '../prototype/Prototype'
import { Logo } from '../components/Logo'
import { Screenshot } from '../components/Screenshot'
import { isTodo } from '../components/todo'
import { Bullets, Callout, Card, H3, Paragraphs, Section, Text, Todo } from '../components/ui'

export function ContextSection() {
  return (
    <Section id="kontext">
      <Paragraphs items={context.intro} />
      <dl className="grid grid-cols-3 gap-2 sm:gap-4">
        {context.facts.map((fact) => (
          <div key={fact.label} className="rounded-(--radius-card) bg-white p-3 shadow-soft sm:p-4">
            <dt className="sr-only">{fact.label}</dt>
            <dd className="font-heading text-xl font-bold text-cobalt sm:text-3xl">{fact.value}</dd>
            <dd className="mt-1 text-xs text-muted sm:text-sm">{fact.label}</dd>
          </div>
        ))}
      </dl>
      <p className="text-sm text-muted">{context.source}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h3 className="flex items-center gap-2 font-semibold">
            <Check aria-hidden size={18} className="text-positive" />
            {context.focusTitle}
          </h3>
          <div className="mt-3 text-sm">
            <Bullets items={context.focus} />
          </div>
        </Card>
        <Card>
          <h3 className="flex items-center gap-2 font-semibold">
            <X aria-hidden size={18} className="text-coral-600" />
            {context.outOfScopeTitle}
          </h3>
          <div className="mt-3 text-sm">
            <Bullets items={context.outOfScope} />
          </div>
        </Card>
      </div>
    </Section>
  )
}

function FindingField({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-sm">{isTodo(text) ? <Todo text={text} /> : text}</dd>
    </div>
  )
}

export function AuditSection() {
  return (
    <Section id="audit" tone="warm">
      <Paragraphs items={audit.intro} />
      <Text text={audit.introTodo} />
      <ol className="space-y-4 pt-2">
        {audit.findings.map((finding, index) => (
          <li key={finding.screenshot}>
            <Card className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <Screenshot
                file={finding.screenshot}
                alt={`Screenshot, ${finding.step}`}
                missingLabel={audit.missingScreenshot}
              />
              <div>
                <p className="flex items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cobalt font-heading text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-muted uppercase">
                    {audit.labels.step}
                  </span>
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  {isTodo(finding.step) ? <Todo text={finding.step} /> : finding.step}
                </h3>
                <dl className="mt-3 space-y-3">
                  <FindingField label={audit.labels.observed} text={finding.observed} />
                  <FindingField label={audit.labels.why} text={finding.why} />
                  <FindingField label={audit.labels.proposal} text={finding.proposal} />
                </dl>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function OpportunitySection() {
  return (
    <Section id="prilezitost">
      <H3>{opportunity.whyTitle}</H3>
      <p>{opportunity.whyIntro}</p>
      <ol className="space-y-3">
        {opportunity.why.map((reason, index) => (
          <li key={reason} className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cream font-heading text-sm font-semibold text-cobalt">
              {index + 1}
            </span>
            <span>{reason}</span>
          </li>
        ))}
      </ol>

      <H3>{opportunity.variantsTitle}</H3>
      <p>{opportunity.variantsIntro}</p>
      <div className="grid gap-4 md:grid-cols-3">
        {opportunity.variants.map((variant) => (
          <Card key={variant.key} className="flex flex-col">
            <span className="flex size-9 items-center justify-center rounded-full bg-cobalt font-heading font-semibold text-white">
              {variant.key}
            </span>
            <h4 className="mt-3 font-semibold">{variant.title}</h4>
            <p className="mt-3 text-xs font-semibold tracking-wide text-positive uppercase">
              {opportunity.prosLabel}
            </p>
            <ul className="mt-1 space-y-1.5 text-sm">
              {variant.pros.map((pro) => (
                <li key={pro} className="flex gap-2">
                  <Check aria-hidden size={16} className="mt-0.5 shrink-0 text-positive" />
                  {pro}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs font-semibold tracking-wide text-coral-600 uppercase">
              {opportunity.risksLabel}
            </p>
            <ul className="mt-1 space-y-1.5 text-sm">
              {variant.risks.map((risk) => (
                <li key={risk} className="flex gap-2">
                  <X aria-hidden size={16} className="mt-0.5 shrink-0 text-coral-600" />
                  {risk}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Callout tone="highlight" title={opportunity.recommendationTitle}>
        <Paragraphs items={opportunity.recommendation} />
      </Callout>

      <Callout tone="key" title={opportunity.questionTitle}>
        <p className="font-heading text-lg font-semibold text-cobalt-deep">
          {opportunity.question}
        </p>
        <Paragraphs items={opportunity.questionBody} />
        <p className="text-sm text-muted">{opportunity.questionNote}</p>
      </Callout>
    </Section>
  )
}

export function PrototypeSection() {
  return (
    <Section id="prototyp" tone="warm">
      <Paragraphs items={prototype.intro} />
      <div className="py-2">
        <Prototype />
      </div>
      <H3>{prototype.rationaleTitle}</H3>
      <Text text={prototype.rationaleTodo} />
      <Paragraphs items={prototype.rationale} />
    </Section>
  )
}

export function CalculatorSection() {
  return (
    <Section id="kalkulacka">
      <Callout tone="warning" title={calculator.warningTitle}>
        <p>{calculator.warning}</p>
        <Text text={calculator.warningTodo} />
      </Callout>
      <ImpactCalculator />
      <H3>{calculator.sensitivityTitle}</H3>
      <Paragraphs items={calculator.sensitivity} />
    </Section>
  )
}

export function ValidationSection() {
  return (
    <Section id="overeni" tone="warm">
      <H3>{validation.experimentTitle}</H3>
      <dl className="space-y-3">
        {validation.metrics.map((metric) => (
          <Card key={metric.label} className="py-4">
            <dt className="font-heading font-semibold text-cobalt-deep">{metric.label}</dt>
            <dd className="mt-1 text-sm">{metric.text}</dd>
          </Card>
        ))}
      </dl>

      <H3>{validation.durationTitle}</H3>
      <Paragraphs items={validation.duration} />

      <H3>{validation.decisionTitle}</H3>
      <ul className="space-y-2">
        {validation.decision.map((rule) => (
          <li key={rule.label} className="rounded-[10px] bg-white p-4 shadow-soft">
            <strong className="font-heading font-semibold text-cobalt-deep">{rule.label}</strong>{' '}
            {rule.text}
          </li>
        ))}
      </ul>

      <H3>{validation.rolloutTitle}</H3>
      <ol className="relative space-y-4 border-l-2 border-azure pl-6">
        {validation.rollout.map((item, index) => (
          <li key={item} className="relative">
            <span className="absolute top-0 -left-[37px] flex size-6 items-center justify-center rounded-full bg-cobalt font-heading text-xs font-semibold text-white">
              {index + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
      <Text text={validation.rolloutTodo} />

      <Callout tone="tip" title={validation.previousTitle}>
        <p>{validation.previous}</p>
        <p>
          <a
            href={validation.previousUrl}
            className="inline-flex min-h-11 items-center gap-1.5 font-medium text-cobalt underline underline-offset-4"
          >
            {validation.previousLinkLabel}
            <ExternalLink aria-hidden size={16} />
          </a>
        </p>
        <Text text={validation.previousTodo} />
      </Callout>
    </Section>
  )
}

export function QuestionsSection() {
  return (
    <Section id="otazky">
      <p>{questions.intro}</p>
      <ol className="space-y-3">
        {questions.items.map((question, index) => (
          <li
            key={question}
            className="flex gap-4 rounded-(--radius-card) bg-white p-4 shadow-soft"
          >
            <span className="font-heading text-2xl font-bold text-coral">{index + 1}</span>
            <span className="pt-1">{question}</span>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="bg-cobalt-deep text-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Logo tone="dark" />
        <p className="mt-8 font-heading text-xl font-semibold text-white">{meta.author}</p>
        <ul className="mt-3 space-y-1">
          <li>
            <a
              href={`mailto:${meta.email}`}
              className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline"
            >
              <Mail aria-hidden size={18} className="text-amber" />
              {meta.email}
            </a>
          </li>
          <li>
            <a
              href={`https://${meta.linkedin}`}
              className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline"
            >
              <ExternalLink aria-hidden size={18} className="text-amber" />
              {meta.linkedin}
            </a>
          </li>
        </ul>
        <p className="mt-6 border-t border-white/20 pt-6 text-sm text-azure-light">
          {footer.disclaimerShort}
        </p>
      </div>
    </footer>
  )
}
