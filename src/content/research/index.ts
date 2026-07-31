import type { ResearchItem } from '../../types/content'

export const researchItems: ResearchItem[] = [
  {
    title: 'Feedback, revision and learner agency',
    slug: 'feedback-revision-learner-agency',
    summary: 'Practitioner inquiry into how learners interpret feedback and turn it into meaningful changes in writing.',
    category: 'Writing assessment and feedback',
    status: 'Ongoing research',
    featured: true,
    body: [
      { type: 'paragraph', text: 'Feedback does not improve writing by itself. Learners need to notice what the feedback refers to, understand why it matters and decide what to do next.' },
      { type: 'heading', text: 'Focus of the inquiry' },
      { type: 'paragraph', text: 'This practitioner inquiry considers the relationship between feedback, revision behaviour and learner agency. It is concerned with what learners do after feedback is provided, not simply with the quantity of comments they receive.' },
      { type: 'list', items: ['How learners interpret feedback', 'How feedback is connected to specific revision decisions', 'How reflection can make improvement visible', 'How responsibility can be shared without removing teacher guidance'] },
      { type: 'heading', text: 'Current status' },
      { type: 'paragraph', text: 'The work is ongoing. Findings and formal outputs will be added only after they have been reviewed and approved for publication.' },
    ],
  },
  {
    title: 'The PEER learning workflow',
    slug: 'peer-learning-workflow',
    summary: 'Development work connecting self-assessment, peer review, teacher feedback, guided revision and evidence of improvement.',
    category: 'Peer review',
    status: 'Project overview',
    featured: true,
    body: [
      { type: 'paragraph', text: 'PEER is being designed around a learning workflow rather than a single feedback event. Its structure connects assessment with interpretation, revision and reflection.' },
      { type: 'heading', text: 'The framework' },
      { type: 'list', items: ['Pinpoint: identify an issue or opportunity', 'Explain: understand why it matters', 'Enhance: revise through guided action', 'Result: review improvement and carry the learning forward'] },
      { type: 'heading', text: 'Development questions' },
      { type: 'paragraph', text: 'Current development examines how self-assessment, peer review and teacher feedback can form a coherent sequence while keeping the learner actively involved in decisions about writing.' },
    ],
  },
  {
    title: 'Responsible AI for writing development',
    slug: 'responsible-ai-writing-development',
    summary: 'Exploring how AI-supported prompts and feedback can strengthen reflection without displacing learner judgement.',
    category: 'AI-supported learning',
    status: 'Ongoing research',
    featured: true,
    body: [
      { type: 'paragraph', text: 'AI can provide rapid responses to writing, but speed and volume do not necessarily produce learning. This inquiry starts from the principle that AI should support thinking rather than replace it.' },
      { type: 'heading', text: 'Areas of attention' },
      { type: 'list', items: ['Guided feedback rather than answer generation', 'Learner interpretation before revision', 'Teacher visibility and moderation', 'Transparent model and prompt provenance', 'Evidence of whether feedback leads to action'] },
      { type: 'heading', text: 'Current status' },
      { type: 'paragraph', text: 'This is an ongoing area of research and product development. No claims of effectiveness are made before appropriate evidence is available.' },
    ],
  },
]

export function getResearchItem(slug: string) {
  return researchItems.find((item) => item.slug === slug)
}

export const featuredResearchItems = researchItems.filter((item) => item.featured)
