import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

interface TechnicalScenario {
  id: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  evaluationCriteria: string[]
  sampleApproach: string
  followUpQuestions: string[]
}

const domainScenarios: Record<string, TechnicalScenario[]> = {
  'software-engineer': [
    {
      id: 'se-1',
      category: 'System Design',
      difficulty: 'medium',
      question: 'Design a URL shortening service like bit.ly. How would you handle 10 million requests per day?',
      evaluationCriteria: [
        'Identifies core components (API, storage, analytics)',
        'Discusses database schema and caching strategy',
        'Addresses scalability and load balancing',
        'Considers sharding or partitioning approaches',
        'Mentions analytics and tracking requirements'
      ],
      sampleApproach: 'Start with high-level architecture: API layer, redirect service, hash generator. Use consistent hashing for short codes. Implement Redis caching for popular URLs. Consider geographic distribution for global latency.',
      followUpQuestions: [
        'How would you handle a URL that points to malicious content?',
        'What happens when your hash generator produces a collision?',
        'How would you implement rate limiting?'
      ]
    },
    {
      id: 'se-2',
      category: 'Debugging',
      difficulty: 'medium',
      question: 'A web application is running slowly. Users report timeouts. How would you diagnose this issue?',
      evaluationCriteria: [
        'Asks clarifying questions about the symptoms',
        'Proposes systematic debugging approach',
        'Identifies potential causes (network, database, server)',
        'Suggests monitoring and logging tools',
        'Discusses optimization strategies'
      ],
      sampleApproach: 'Check server logs for errors. Analyze database query performance. Review recent code deployments. Test API response times. Monitor server resource usage (CPU, memory, network).',
      followUpQuestions: [
        'How would you prevent this issue from happening again?',
        'What monitoring would you implement going forward?',
        'How do you balance quick fixes vs. proper solutions?'
      ]
    },
    {
      id: 'se-3',
      category: 'Code Review',
      difficulty: 'easy',
      question: 'Review this code snippet and identify issues:\n\nfunction getUserById(users, id) {\n  for (let i = 0; i < users.length; i++) {\n    if (users[i].id === id) {\n      return users[i];\n    }\n  }\n  return null;\n}',
      evaluationCriteria: [
        'Identifies O(n) complexity issue',
        'Suggests using Map/Hash for O(1) lookup',
        'Notes missing input validation',
        'Mentions edge cases (empty array, null values)',
        'Discusses immutability considerations'
      ],
      sampleApproach: 'The loop is O(n). For large datasets, convert to Map: const userMap = new Map(users.map(u => [u.id, u])); Then lookup is O(1). Also add null checks for inputs.',
      followUpQuestions: [
        'How would you handle a case-insensitive search?',
        'What if users is a linked list instead of an array?'
      ]
    },
    {
      id: 'se-4',
      category: 'Algorithms',
      difficulty: 'hard',
      question: 'Design an algorithm to find the kth largest element in an unsorted array of n elements. What is the time and space complexity?',
      evaluationCriteria: [
        'Discusses multiple approaches (sorting, quickselect, heap)',
        'Analyzes time and space complexity correctly',
        'Considers trade-offs between approaches',
        'Addresses edge cases',
        'Asks clarifying questions about constraints'
      ],
      sampleApproach: 'Options: 1) Sort O(n log n), 2) Quickselect O(n) average but O(n^2) worst case, 3) Min-heap O(n log k). Best depends on relationship between n and k.',
      followUpQuestions: [
        'How would you handle streaming data where you cannot store all elements?',
        'What if the array is nearly sorted?'
      ]
    },
    {
      id: 'se-5',
      category: 'Distributed Systems',
      difficulty: 'hard',
      question: 'Explain the CAP theorem. In a distributed system, can you ever have all three (Consistency, Availability, Partition Tolerance)?',
      evaluationCriteria: [
        'Correctly explains CAP theorem',
        'Discusses what happens during network partitions',
        'Explains trade-offs between CA, CP, AP systems',
        'Gives real-world examples (Cassandra, MongoDB, etc.)',
        'Discusses practical implications'
      ],
      sampleApproach: 'CAP: During a partition, you must choose between Consistency and Availability. You cannot have all three simultaneously. Most systems are either CP (prioritize consistency) or AP (prioritize availability).',
      followUpQuestions: [
        'How does Eventual Consistency fit into this?',
        'What would you choose for a banking system?'
      ]
    },
    {
      id: 'se-6',
      category: 'API Design',
      difficulty: 'medium',
      question: 'Design a RESTful API for a todo application. What endpoints would you create and what HTTP methods would you use?',
      evaluationCriteria: [
        'Identifies appropriate HTTP methods (GET, POST, PUT, DELETE)',
        'Uses proper URL naming conventions',
        'Addresses statelessness',
        'Considers error handling and status codes',
        'Mentions authentication and versioning'
      ],
      sampleApproach: 'GET /todos (list), POST /todos (create), GET /todos/:id (read), PUT /todos/:id (update), DELETE /todos/:id (delete). Use proper status codes: 200, 201, 204, 400, 404, 500.',
      followUpQuestions: [
        'How would you handle pagination?',
        'How would you implement filtering and sorting?'
      ]
    }
  ],
  'frontend-developer': [
    {
      id: 'fe-1',
      category: 'Performance',
      difficulty: 'medium',
      question: 'A React application is rendering slowly. The DOM has 1000+ items. How would you optimize it?',
      evaluationCriteria: [
        'Identifies virtualization/recycling',
        'Discusses React.memo and useMemo',
        'Mentions key prop importance',
        'Considers pagination or infinite scroll',
        'Addresses code splitting'
      ],
      sampleApproach: 'Use react-window or react-virtualized for virtualization. Wrap components with React.memo. Use useMemo for expensive calculations. Implement pagination or infinite scroll instead of rendering all items.',
      followUpQuestions: [
        'How would you handle dynamic heights in virtualized lists?',
        'What about SEO considerations?'
      ]
    },
    {
      id: 'fe-2',
      category: 'State Management',
      difficulty: 'medium',
      question: 'When would you use local component state vs. global state management (Redux, Context)?',
      evaluationCriteria: [
        'Distinguishes local vs. global state',
        'Discusses when to use each approach',
        'Mentions performance implications',
        'Considers complexity trade-offs',
        'Addresses alternatives (Recoil, Zustand, etc.)'
      ],
      sampleApproach: 'Local state: UI state, form inputs, toggles. Global state: user auth, theme, cached server data. Use Context for low-frequency updates, Redux for high-frequency or complex logic.',
      followUpQuestions: [
        'How do you prevent unnecessary re-renders with Context?',
        'What about server state management (React Query, SWR)?'
      ]
    },
    {
      id: 'fe-3',
      category: 'CSS & Layout',
      difficulty: 'easy',
      question: 'Explain the difference between CSS Grid and Flexbox. When would you use each?',
      evaluationCriteria: [
        'Correctly distinguishes 1D vs. 2D layouts',
        'Gives appropriate use cases for each',
        'Discusses browser support',
        'Mentions common pitfalls',
        'Addresses responsive design considerations'
      ],
      sampleApproach: 'Flexbox: 1D layouts (row OR column), navigation, centering. Grid: 2D layouts (rows AND columns), page layouts, complex dashboards. Can be used together.',
      followUpQuestions: [
        'How do you handle cross-browser differences?',
        'What about CSS-in-JS solutions?'
      ]
    },
    {
      id: 'fe-4',
      category: 'Security',
      difficulty: 'medium',
      question: 'What is XSS and how would you prevent it in a React application?',
      evaluationCriteria: [
        'Correctly explains XSS attack',
        'Identifies Reacts built-in protections',
        'Discusses dangerous patterns (dangerouslySetInnerHTML)',
        'Mentions Content Security Policy',
        'Addresses stored vs. reflected XSS'
      ],
      sampleApproach: 'React escapes by default. Avoid dangerouslySetInnerHTML. Validate and sanitize user input. Use CSP headers. Never insert untrusted data into innerHTML, eval(), or event handlers.',
      followUpQuestions: [
        'What about third-party component libraries?',
        'How does this differ in SSR frameworks like Next.js?'
      ]
    },
    {
      id: 'fe-5',
      category: 'Testing',
      difficulty: 'medium',
      question: 'How would you test a React component that makes an API call on button click?',
      evaluationCriteria: [
        'Identifies unit vs. integration testing',
        'Discusses mocking API calls',
        'Mentions testing library (React Testing Library)',
        'Addresses user-centric testing approach',
        'Considers async handling'
      ],
      sampleApproach: 'Use React Testing Library. Mock the API with jest.spyOn or MSW. Simulate user click. Assert on UI changes. Handle async with findBy queries.',
      followUpQuestions: [
        'How would you test error states?',
        'What about testing components with context providers?'
      ]
    },
    {
      id: 'fe-6',
      category: 'Accessibility',
      difficulty: 'medium',
      question: 'How would you make a modal dialog accessible? What ARIA attributes would you use?',
      evaluationCriteria: [
        'Identifies key ARIA attributes (role, aria-modal, aria-labelledby)',
        'Discusses keyboard navigation (Escape to close, focus trap)',
        'Mentions focus management',
        'Addresses screen reader considerations',
        'Considers mobile touch targets'
      ],
      sampleApproach: 'Use role="dialog", aria-modal="true", aria-labelledby for title. Trap focus inside modal. Close on Escape. Return focus on close. Ensure 44px minimum touch targets.',
      followUpQuestions: [
        'How do you test accessibility?',
        'What about nested modals?'
      ]
    }
  ],
  'backend-developer': [
    {
      id: 'be-1',
      category: 'Database',
      difficulty: 'medium',
      question: 'When would you choose a relational database vs. a NoSQL database? Give specific examples.',
      evaluationCriteria: [
        'Identifies key differences (ACID vs. BASE)',
        'Gives appropriate use cases for each',
        'Considers data modeling implications',
        'Discusses scalability differences',
        'Addresses hybrid approaches'
      ],
      sampleApproach: 'Relational: structured data, complex queries, transactions (e.g., financial, inventory). NoSQL: unstructured, high write throughput, horizontal scaling (e.g., logs, user profiles, caching).',
      followUpQuestions: [
        'How would you handle migrations?',
        'What about polyglot persistence?'
      ]
    },
    {
      id: 'be-2',
      category: 'API Development',
      difficulty: 'medium',
      question: 'Design a rate limiting system for a public API. What algorithms would you use?',
      evaluationCriteria: [
        'Discusses token bucket or leaky bucket algorithms',
        'Considers distributed systems challenges',
        'Addresses storage (Redis, etc.)',
        'Mentions different limits for different tiers',
        'Considers user identification'
      ],
      sampleApproach: 'Token bucket: each user has tokens, refilled at rate. Leaky bucket: requests processed at fixed rate. Use Redis for distributed rate limiting. Consider per-IP vs. per-user limits.',
      followUpQuestions: [
        'How would you handle burst traffic?',
        'What about fair queuing?'
      ]
    },
    {
      id: 'be-3',
      category: 'Authentication',
      difficulty: 'medium',
      question: 'Explain the difference between authentication and authorization. How would you implement JWT vs. session-based auth?',
      evaluationCriteria: [
        'Correctly distinguishes auth vs. authorization',
        'Compares JWT and session approaches',
        'Discusses token storage and refresh',
        'Addresses security considerations',
        'Considers scalability implications'
      ],
      sampleApproach: 'Auth: verifying identity. Authz: verifying permissions. JWT: stateless, stored client-side, good for microservices. Sessions: stateful, stored server-side, simpler revocation.',
      followUpQuestions: [
        'How would you handle token revocation?',
        'What about refresh token rotation?'
      ]
    },
    {
      id: 'be-4',
      category: 'Caching',
      difficulty: 'medium',
      question: 'Design a caching strategy for an e-commerce product page. What would you cache and for how long?',
      evaluationCriteria: [
        'Identifies cacheable vs. non-cacheable data',
        'Discusses cache invalidation strategies',
        'Considers CDN usage',
        'Addresses stale-while-revalidate patterns',
        'Mentions memory vs. distributed cache'
      ],
      sampleApproach: 'Cache product details (TTL: 5-15 min). Never cache user-specific data. Use ETag for conditional requests. Consider CDN for static assets. Implement cache invalidation on updates.',
      followUpQuestions: [
        'How do you handle cache stampedes?',
        'What about cache warming?'
      ]
    },
    {
      id: 'be-5',
      category: 'Messaging',
      difficulty: 'hard',
      question: 'How would you design a message queue system to handle order processing? What happens if a message fails?',
      evaluationCriteria: [
        'Discusses message reliability patterns',
        'Addresses retry and dead letter queues',
        'Considers exactly-once vs. at-least-once',
        'Mentions idempotency',
        'Considers ordering guarantees'
      ],
      sampleApproach: 'Use persistent queues with acknowledgments. Implement exponential backoff for retries. Dead letter queue for failed messages after max retries. Design consumers to be idempotent.',
      followUpQuestions: [
        'How would you handle partial failures in distributed transactions?',
        'What about message ordering?'
      ]
    },
    {
      id: 'be-6',
      category: 'Microservices',
      difficulty: 'hard',
      question: 'How would you handle distributed transactions across multiple microservices?',
      evaluationCriteria: [
        'Identifies the challenge of distributed transactions',
        'Discusses saga pattern',
        'Mentions event sourcing',
        'Considers compensation logic',
        'Addresses data consistency'
      ],
      sampleApproach: 'Avoid distributed transactions. Use saga pattern: each service does its part and publishes event. If one fails, execute compensating transactions. Use outbox pattern for reliability.',
      followUpQuestions: [
        'How do you handle long-running sagas?',
        'What about debugging failed transactions?'
      ]
    }
  ],
  'data-engineer': [
    {
      id: 'de-1',
      category: 'Data Modeling',
      difficulty: 'medium',
      question: 'Explain the difference between star schema and snowflake schema in data warehousing. When would you use each?',
      evaluationCriteria: [
        'Correctly defines both schemas',
        'Identifies pros and cons of each',
        'Discusses normalization vs. denormalization',
        'Considers query performance',
        'Addresses ETL implications'
      ],
      sampleApproach: 'Star: denormalized, fact tables + dimension tables, simpler queries, better performance. Snowflake: normalized, saves storage, more complex queries, better data integrity.',
      followUpQuestions: [
        'What about data lakehouse architectures?',
        'How do you handle slowly changing dimensions?'
      ]
    },
    {
      id: 'de-2',
      category: 'ETL Pipeline',
      difficulty: 'medium',
      question: 'Design an ETL pipeline that processes 1TB of data daily. How would you handle failures and ensure data quality?',
      evaluationCriteria: [
        'Discusses batch vs. streaming approaches',
        'Addresses fault tolerance',
        'Considers data validation',
        'Mentions orchestration tools',
        'Addresses monitoring and alerting'
      ],
      sampleApproach: 'Use Spark for batch processing or Kafka + Flink for streaming. Implement checkpoints for recovery. Validate data at ingestion and transformation. Use Airflow or Prefect for orchestration.',
      followUpQuestions: [
        'How would you handle schema changes?',
        'What about data lineage?'
      ]
    },
    {
      id: 'de-3',
      category: 'Data Quality',
      difficulty: 'medium',
      question: 'How would you ensure data quality in a pipeline processing data from multiple sources?',
      evaluationCriteria: [
        'Identifies data quality dimensions',
        'Discusses validation rules',
        'Addresses anomaly detection',
        'Considers monitoring',
        'Mentions data contracts'
      ],
      sampleApproach: 'Define DQ dimensions: completeness, accuracy, consistency, timeliness. Implement validation at ingestion. Use Great Expectations or similar. Set up alerts for failures. Document data contracts.',
      followUpQuestions: [
        'How do you handle data that fails validation?',
        'What about data remediation?'
      ]
    },
    {
      id: 'de-4',
      category: 'Real-time Processing',
      difficulty: 'hard',
      question: 'Design a real-time analytics dashboard showing website traffic in real-time. What technologies would you use?',
      evaluationCriteria: [
        'Discusses streaming vs. batch',
        'Identifies key components',
        'Considers latency requirements',
        'Addresses backpressure',
        'Mentions storage for different query patterns'
      ],
      sampleApproach: 'Use Kafka for event streaming. Process with Flink or Spark Streaming. Store in ClickHouse or Druid for real-time queries. Redis for current counts. Consider lambda or kappa architecture.',
      followUpQuestions: [
        'How do you handle late-arriving data?',
        'What about exactly-once processing?'
      ]
    },
    {
      id: 'de-5',
      category: 'Data Governance',
      difficulty: 'medium',
      question: 'How would you implement data governance across your data infrastructure?',
      evaluationCriteria: [
        'Discusses catalog and lineage',
        'Addresses access control',
        'Considers data privacy (PII)',
        'Mentions metadata management',
        'Addresses compliance (GDPR, etc.)'
      ],
      sampleApproach: 'Implement data catalog (Amundsen, DataHub). Use column-level encryption for PII. Define data ownership. Document data lineage. Set up access controls and audit logs.',
      followUpQuestions: [
        'How do you handle data retention?',
        'What about cross-border data transfers?'
      ]
    },
    {
      id: 'de-6',
      category: 'Performance',
      difficulty: 'medium',
      question: 'A Spark job is running slowly. How would you diagnose and optimize it?',
      evaluationCriteria: [
        'Identifies common bottlenecks',
        'Discusses partitioning and shuffling',
        'Considers data skew',
        'Addresses serialization',
        'Mentions caching strategies'
      ],
      sampleApproach: 'Check Spark UI for stage/task distribution. Avoid shuffles. Repartition to handle skew. Use Kryo serialization. Cache judiciously. Check for data spills to disk.',
      followUpQuestions: [
        'How would you handle adaptive query execution?',
        'What about dynamic allocation?'
      ]
    }
  ],
  'machine-learning-engineer': [
    {
      id: 'ml-1',
      category: 'MLOps',
      difficulty: 'hard',
      question: 'Design an ML pipeline that trains and deploys a model to production. What components would you include?',
      evaluationCriteria: [
        'Discusses end-to-end pipeline',
        'Addresses model versioning',
        'Considers feature store',
        'Mentions monitoring and rollback',
        'Addresses retraining strategy'
      ],
      sampleApproach: 'Use MLflow or Kubeflow for orchestration. Feature store for consistency. Model registry for versioning. A/B testing for deployment. Monitor for drift. Automated retraining pipeline.',
      followUpQuestions: [
        'How would you handle model explainability?',
        'What about edge deployment?'
      ]
    },
    {
      id: 'ml-2',
      category: 'Model Selection',
      difficulty: 'medium',
      question: 'When would you use a neural network vs. a tree-based model vs. linear regression?',
      evaluationCriteria: [
        'Distinguishes model types',
        'Gives appropriate use cases',
        'Considers interpretability',
        'Addresses data requirements',
        'Discusses computational cost'
      ],
      sampleApproach: 'Linear: simple relationships, interpretable. Tree: nonlinear, good for tabular, interpretable. Neural: complex patterns, images, NLP, requires more data.',
      followUpQuestions: [
        'What about ensemble methods?',
        'How do you handle AutoML?'
      ]
    },
    {
      id: 'ml-3',
      category: 'Deep Learning',
      difficulty: 'hard',
      question: 'Explain the vanishing gradient problem. How do modern architectures like LSTM and transformers address it?',
      evaluationCriteria: [
        'Correctly explains the problem',
        'Discusses how LSTMs address it with gates',
        'Explains attention mechanism in transformers',
        'Considers residual connections',
        'Addresses modern architectures'
      ],
      sampleApproach: 'Vanishing gradient: gradients shrink exponentially in deep networks. LSTMs use gating (forget, input, output) and cell state for gradient flow. Transformers use self-attention for direct connections.',
      followUpQuestions: [
        'What about gradient clipping?',
        'How does this affect very deep networks?'
      ]
    },
    {
      id: 'ml-4',
      category: 'Evaluation',
      difficulty: 'medium',
      question: 'Your model has 95% accuracy but your boss says its not good enough. What would you investigate?',
      evaluationCriteria: [
        'Asks about class distribution',
        'Discusses appropriate metrics',
        'Considers business context',
        'Addresses confusion matrix analysis',
        'Mentions error analysis'
      ],
      sampleApproach: 'Check class imbalance. Look at precision/recall/F1. Analyze confusion matrix. Understand cost of different errors. Consider baseline models. Do error analysis.',
      followUpQuestions: [
        'What if the test distribution differs from train?',
        'How would you collect more data?'
      ]
    },
    {
      id: 'ml-5',
      category: 'Feature Engineering',
      difficulty: 'medium',
      question: 'What is feature engineering? How would you approach feature engineering for a fraud detection problem?',
      evaluationCriteria: [
        'Defines feature engineering',
        'Discusses domain knowledge importance',
        'Identifies types of features',
        'Considers feature selection',
        'Addresses feature importance'
      ],
      sampleApproach: 'Create features from transaction history: frequency, amounts, time patterns, velocity metrics. Aggregate over windows. Encode categorical. Use domain expertise to create interaction features.',
      followUpQuestions: [
        'How would you handle feature leakage?',
        'What about automated feature engineering?'
      ]
    },
    {
      id: 'ml-6',
      category: 'Production',
      difficulty: 'hard',
      question: 'How would you handle concept drift in a production ML model?',
      evaluationCriteria: [
        'Identifies concept drift types',
        'Discusses monitoring strategies',
        'Considers retraining triggers',
        'Addresses online learning',
        'Mentions A/B testing for models'
      ],
      sampleApproach: 'Monitor prediction distribution and feature distribution. Set thresholds for alerts. Implement gradual rollout. Use online learning if applicable. Establish retraining schedule.',
      followUpQuestions: [
        'How do you validate before deploying a retrained model?',
        'What about multi-tenancy effects?'
      ]
    }
  ],
  'cybersecurity-analyst': [
    {
      id: 'sec-1',
      category: 'Incident Response',
      difficulty: 'hard',
      question: 'You discover a potential breach. Walk through your incident response process.',
      evaluationCriteria: [
        'Follows structured approach',
        'Discusses containment strategies',
        'Addresses evidence preservation',
        'Considers communication plan',
        'Mentions post-incident analysis'
      ],
      sampleApproach: '1) Identify and confirm. 2) Contain (isolate, block). 3) Eradicate (remove malware, patch). 4) Recover. 5) Lessons learned. Document everything. Engage legal if needed.',
      followUpQuestions: [
        'How would you handle ransomware?',
        'When do you bring in external help?'
      ]
    },
    {
      id: 'sec-2',
      category: 'Network Security',
      difficulty: 'medium',
      question: 'What is the difference between a VPN, VLAN, and Zero Trust network architecture?',
      evaluationCriteria: [
        'Correctly defines each concept',
        'Explains use cases',
        'Discusses security implications',
        'Considers implementation trade-offs',
        'Addresses modern approaches'
      ],
      sampleApproach: 'VPN: encrypted tunnel for remote access. VLAN: network segmentation at Layer 2. Zero Trust: never trust, always verify - identity-based, not network-based.',
      followUpQuestions: [
        'How does microsegmentation fit in?',
        'What about legacy systems?'
      ]
    },
    {
      id: 'sec-3',
      category: 'Application Security',
      difficulty: 'medium',
      question: 'What is SQL injection and how would you prevent it?',
      evaluationCriteria: [
        'Correctly explains the attack',
        'Discusses parameterized queries',
        'Addresses other mitigation techniques',
        'Considers ORM usage',
        'Mentions testing approaches'
      ],
      sampleApproach: 'SQLi: attacker manipulates SQL queries through input. Prevention: parameterized queries/prepared statements, input validation, least privilege database users, web application firewall.',
      followUpQuestions: [
        'What about NoSQL injection?',
        'How would you test for this?'
      ]
    },
    {
      id: 'sec-4',
      category: 'Threat Modeling',
      difficulty: 'medium',
      question: 'How would you conduct a threat modeling session for a new application?',
      evaluationCriteria: [
        'Follows structured methodology',
        'Discusses STRIDE or similar framework',
        'Identifies assets and entry points',
        'Considers threat prioritization',
        'Addresses documentation'
      ],
      sampleApproach: 'Use STRIDE: Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege. Create data flow diagrams. Identify threats. Prioritize by risk. Document mitigations.',
      followUpQuestions: [
        'How do you prioritize threats?',
        'When should you revisit threat models?'
      ]
    },
    {
      id: 'sec-5',
      category: 'Vulnerability Management',
      difficulty: 'medium',
      question: 'You have 500 vulnerabilities in your environment. How do you prioritize which to fix first?',
      evaluationCriteria: [
        'Discusses risk-based prioritization',
        'Considers CVSS scoring',
        'Addresses exploitability',
        'Mentions asset criticality',
        'Addresses remediation timelines'
      ],
      sampleApproach: 'Prioritize by: exploit availability, asset criticality, attack surface exposure, remediation effort. Use CVSS as starting point. Consider threat intelligence. Map to business impact.',
      followUpQuestions: [
        'How do you handle vulnerabilities in third-party code?',
        'What about compensating controls?'
      ]
    },
    {
      id: 'sec-6',
      category: 'Cloud Security',
      difficulty: 'hard',
      question: 'What are the shared responsibilities in AWS security? What does AWS manage vs. the customer?',
      evaluationCriteria: [
        'Distinguishes IaaS vs. PaaS vs. SaaS',
        'Lists AWS responsibilities',
        'Lists customer responsibilities',
        'Discusses common misconfigurations',
        'Addresses security services'
      ],
      sampleApproach: 'AWS: physical, network, hypervisor, hardware. Customer: data, access, applications, OS (EC2), configuration. In SaaS: customer only manages data and access.',
      followUpQuestions: [
        'What about compliance frameworks?',
        'How do you secure serverless?'
      ]
    }
  ],
  'cloud-engineer': [
    {
      id: 'cloud-1',
      category: 'Architecture',
      difficulty: 'hard',
      question: 'Design a highly available architecture on AWS that can handle the failure of an entire availability zone.',
      evaluationCriteria: [
        'Discusses multi-AZ deployment',
        'Addresses load balancing',
        'Considers data replication',
        'Mentions DNS routing',
        'Addresses automation'
      ],
      sampleApproach: 'Deploy across 3 AZs. Use ALB with cross-zone routing. RDS Multi-AZ for databases. S3 cross-region replication. Route 53 health checks. Auto Scaling groups.',
      followUpQuestions: [
        'How do you test this?',
        'What about cost optimization?'
      ]
    },
    {
      id: 'cloud-2',
      category: 'Cost Optimization',
      difficulty: 'medium',
      question: 'Your monthly AWS bill is higher than expected. How would you analyze and reduce costs?',
      evaluationCriteria: [
        'Discusses cost analysis tools',
        'Identifies common waste sources',
        'Considers reserved instances vs. on-demand',
        'Addresses tagging strategies',
        'Mentions automation'
      ],
      sampleApproach: 'Use AWS Cost Explorer and CUR. Identify unattached EBS volumes, idle instances, oversized resources. Implement S3 lifecycle policies. Use Savings Plans or Reserved Instances for predictable load.',
      followUpQuestions: [
        'How do you implement chargeback?',
        'What about spot instances?'
      ]
    },
    {
      id: 'cloud-3',
      category: 'Container Orchestration',
      difficulty: 'medium',
      question: 'What is Kubernetes and when would you use it vs. managed container services?',
      evaluationCriteria: [
        'Defines Kubernetes and its components',
        'Discusses self-managed vs. managed (EKS, GKE, AKS)',
        'Considers complexity trade-offs',
        'Addresses scaling requirements',
        'Mentions cost implications'
      ],
      sampleApproach: 'K8s: container orchestration for complex workloads, multi-cloud. Use EKS/GKE for managed control plane if you want less ops work. ECS/Fargate for simpler AWS-native needs.',
      followUpQuestions: [
        'How do you handle secrets?',
        'What about service mesh?'
      ]
    },
    {
      id: 'cloud-4',
      category: 'Infrastructure as Code',
      difficulty: 'medium',
      question: 'Compare Terraform and CloudFormation. When would you use each?',
      evaluationCriteria: [
        'Distinguishes declarative vs. procedural',
        'Discusses state management',
        'Considers multi-cloud support',
        'Addresses learning curve',
        'Mentions ecosystem'
      ],
      sampleApproach: 'Terraform: multi-cloud, provider-based, state file needed. CloudFormation: AWS-only, no state file, better integration. Choose based on cloud strategy and team experience.',
      followUpQuestions: [
        'How do you handle secret values in IaC?',
        'What about testing IaC?'
      ]
    },
    {
      id: 'cloud-5',
      category: 'Disaster Recovery',
      difficulty: 'hard',
      question: 'Design a disaster recovery strategy for a critical application with RPO of 1 hour and RTO of 4 hours.',
      evaluationCriteria: [
        'Understands RPO and RTO',
        'Discusses backup strategies',
        'Considers replication approaches',
        'Addresses automation',
        'Mentions testing'
      ],
      sampleApproach: 'RPO 1 hour: hourly database backups, async replication. RTO 4 hours: auto-failover, AMIs pre-built, runbooks for recovery. Use multi-region with automated failover.',
      followUpQuestions: [
        'How do you test DR?',
        'What about data corruption?'
      ]
    },
    {
      id: 'cloud-6',
      category: 'Monitoring',
      difficulty: 'medium',
      question: 'How would you set up monitoring for a microservices architecture?',
      evaluationCriteria: [
        'Discusses the three pillars: logs, metrics, traces',
        'Identifies key metrics',
        'Considers distributed tracing',
        'Addresses alerting',
        'Mentions visualization'
      ],
      sampleApproach: 'Use CloudWatch/Datadog for metrics. ELK/Loki for logs. Jaeger/X-Ray for traces. Set up synthesized monitoring. Create dashboards. Define alert thresholds based on SLOs.',
      followUpQuestions: [
        'How do you handle alert fatigue?',
        'What about cost of logging?'
      ]
    }
  ],
  'business-analyst': [
    {
      id: 'ba-1',
      category: 'Requirements',
      difficulty: 'medium',
      question: 'How do you gather requirements from stakeholders who have conflicting priorities?',
      evaluationCriteria: [
        'Discusses stakeholder analysis',
        'Addresses conflict resolution',
        'Considers prioritization frameworks',
        'Mentions facilitation techniques',
        'Addresses documentation'
      ],
      sampleApproach: 'Identify all stakeholders and their interests. Use MoSCoW or Kano for prioritization. Facilitate working sessions. Document assumptions. Escalate unresolved conflicts with data.',
      followUpQuestions: [
        'How do you handle scope creep?',
        'What about changing requirements?'
      ]
    },
    {
      id: 'ba-2',
      category: 'Process Modeling',
      difficulty: 'medium',
      question: 'How would you document and improve a business process?',
      evaluationCriteria: [
        'Discusses process documentation',
        'Identifies improvement opportunities',
        'Considers stakeholder input',
        'Addresses automation potential',
        'Mentions measurement'
      ],
      sampleApproach: 'Document current state with flowcharts. Identify bottlenecks, waste, delays. Interview process owners. Use Lean principles. Prioritize improvements. Measure after changes.',
      followUpQuestions: [
        'How do you get stakeholder buy-in for changes?',
        'What about change management?'
      ]
    },
    {
      id: 'ba-3',
      category: 'Data Analysis',
      difficulty: 'medium',
      question: 'A stakeholder asks why sales dropped 20% this month. How would you investigate?',
      evaluationCriteria: [
        'Proposes analytical framework',
        'Considers multiple hypotheses',
        'Addresses data sources',
        'Discusses visualization',
        'Mentions root cause analysis'
      ],
      sampleApproach: 'Segment the data (product, region, customer). Compare to prior periods. Check for external factors (seasonality, market). Correlate with internal changes. Form and test hypotheses.',
      followUpQuestions: [
        'How would you present findings?',
        'What about predictive analysis?'
      ]
    },
    {
      id: 'ba-4',
      category: 'Stakeholder Management',
      difficulty: 'medium',
      question: 'How do you manage a stakeholder who is resistant to a new system implementation?',
      evaluationCriteria: [
        'Identifies root of resistance',
        'Discusses communication strategies',
        'Considers training needs',
        'Addresses concerns',
        'Mentions quick wins'
      ],
      sampleApproach: 'Understand their concerns. Involve them in planning. Show value early with quick wins. Provide training. Address fears about job security. Find champions among their team.',
      followUpQuestions: [
        'How do you measure success?',
        'What about post-implementation support?'
      ]
    },
    {
      id: 'ba-5',
      category: 'Testing',
      difficulty: 'easy',
      question: 'What is the difference between UAT and system testing? Who should be involved in each?',
      evaluationCriteria: [
        'Distinguishes test types',
        'Discusses purpose of each',
        'Identifies appropriate testers',
        'Considers documentation',
        'Addresses sign-off'
      ],
      sampleApproach: 'System testing: QA team, tests functionality, edge cases. UAT: business users, tests real scenarios, validates business needs. UAT follows system testing.',
      followUpQuestions: [
        'How do you handle failed UAT?',
        'What about test data?'
      ]
    },
    {
      id: 'ba-6',
      category: 'Agile',
      difficulty: 'medium',
      question: 'How do you prioritize user stories in a sprint? What criteria do you use?',
      evaluationCriteria: [
        'Discusses prioritization frameworks',
        'Considers business value',
        'Addresses dependencies',
        'Mentions estimation',
        'Considers capacity planning'
      ],
      sampleApproach: 'Use WSJF (weighted shortest job first): business value + time criticality divided by effort. Consider dependencies. Balance tech debt. Plan for capacity. Review with product owner.',
      followUpQuestions: [
        'How do you handle scope changes mid-sprint?',
        'What about technical debt?'
      ]
    }
  ],
  'technical-writer': [
    {
      id: 'tw-1',
      category: 'Documentation Types',
      difficulty: 'easy',
      question: 'What is the difference between user documentation, API documentation, and developer documentation?',
      evaluationCriteria: [
        'Distinguishes documentation types',
        'Identifies audiences for each',
        'Discusses content differences',
        'Considers tools',
        'Addresses maintenance'
      ],
      sampleApproach: 'User: how-to guides for end users. API: reference + tutorials for developers integrating. Developer: architecture, setup, contribution guides for engineers.',
      followUpQuestions: [
        'How do you choose the right format?',
        'What about localization?'
      ]
    },
    {
      id: 'tw-2',
      category: 'Information Architecture',
      difficulty: 'medium',
      question: 'How would you structure documentation for a complex software product?',
      evaluationCriteria: [
        'Discusses organization strategies',
        'Considers user tasks',
        'Addresses navigation',
        'Mentions search',
        'Addresses versioning'
      ],
      sampleApproach: 'Group by user task or persona. Create clear hierarchy. Use consistent templates. Implement robust search. Version by product release. Include overview, tutorials, reference.',
      followUpQuestions: [
        'How do you handle multiple products?',
        'What about third-party content?'
      ]
    },
    {
      id: 'tw-3',
      category: 'Clarity',
      difficulty: 'medium',
      question: 'How would you simplify complex technical concepts for a non-technical audience?',
      evaluationCriteria: [
        'Discusses audience analysis',
        'Uses analogies and examples',
        'Addresses visuals',
        'Considers pacing',
        'Mentions testing comprehension'
      ],
      sampleApproach: 'Know your audience. Use analogies to familiar concepts. Start with overview before details. Use visuals. Break into steps. Test with real users.',
      followUpQuestions: [
        'How do you handle jargon?',
        'What about international audiences?'
      ]
    },
    {
      id: 'tw-4',
      category: 'Tools',
      difficulty: 'easy',
      question: 'Compare Markdown, reStructuredText, and DITA for technical documentation.',
      evaluationCriteria: [
        'Distinguishes markup languages',
        'Discusses use cases',
        'Considers tooling',
        'Addresses collaboration',
        'Mentions output formats'
      ],
      sampleApproach: 'Markdown: simple, GitHub-friendly. reStructuredText: Sphinx for Python docs. DITA: structured, component content, enterprise. Choose based on team and output needs.',
      followUpQuestions: [
        'What about docs-as-code?',
        'How do you manage and assets images?'
      ]
    },
    {
      id: 'tw-5',
      category: 'Review Process',
      difficulty: 'medium',
      question: 'How would you establish a documentation review process?',
      evaluationCriteria: [
        'Discusses review types',
        'Identifies reviewers',
        'Considers feedback loops',
        'Addresses version control',
        'Mentions sign-off'
      ],
      sampleApproach: 'Technical accuracy: subject matter expert. Clarity: peer review. Usability: user testing. Use Git for version control. Establish style guide. Get stakeholder sign-off.',
      followUpQuestions: [
        'How do you handle tight deadlines?',
        'What about content reuse?'
      ]
    },
    {
      id: 'tw-6',
      category: 'API Documentation',
      difficulty: 'medium',
      question: 'What makes great API documentation? What elements would you include?',
      evaluationCriteria: [
        'Identifies key components',
        'Discusses examples importance',
        'Considers interactive elements',
        'Addresses error codes',
        'Mentions versioning'
      ],
      sampleApproach: 'Include: authentication, endpoint overview, parameters, request/response examples, error codes, code samples in multiple languages. Use OpenAPI/Swagger. Provide playground if possible.',
      followUpQuestions: [
        'How do you keep docs in sync with code?',
        'What about deprecation notices?'
      ]
    }
  ],
  'data-scientist': [
    {
      id: 'ds-1',
      category: 'Machine Learning',
      difficulty: 'hard',
      question: 'You need to build a fraud detection model. Transaction data is highly imbalanced (0.1% fraud). How would you approach this?',
      evaluationCriteria: [
        'Identifies the class imbalance problem',
        'Discusses appropriate metrics (precision, recall, F1, AUC-ROC)',
        'Suggests techniques (SMOTE, undersampling, class weights)',
        'Addresses feature engineering for fraud patterns',
        'Considers real-time vs. batch processing'
      ],
      sampleApproach: 'Start with baseline model, then handle imbalance using SMOTE or class weights. Focus on recall for fraud (do not miss real fraud) while maintaining reasonable precision. Engineer features like transaction frequency, amount patterns, time-based features.',
      followUpQuestions: [
        'How would you handle a case where fraud patterns change over time?',
        'What are the business trade-offs between false positives and false negatives?'
      ]
    },
    {
      id: 'ds-2',
      category: 'Data Analysis',
      difficulty: 'medium',
      question: 'You have a dataset with 10% missing values across multiple columns. What is your approach to handling this?',
      evaluationCriteria: [
        'Asks about the nature of missing data (MCAR, MAR, MNAR)',
        'Suggests appropriate imputation techniques',
        'Considers column-specific strategies',
        'Discusses when to drop vs. impute',
        'Mentions validation of imputed values'
      ],
      sampleApproach: 'First analyze patterns in missing data. For random missing: mean/median imputation, KNN imputation, or model-based imputation. For categorical: create missing category. Always validate imputed values make sense.',
      followUpQuestions: [
        'How would you explain your imputation choices to stakeholders?',
        'What if the missing data is 50% instead of 10%?'
      ]
    },
    {
      id: 'ds-3',
      category: 'Statistics',
      difficulty: 'medium',
      question: 'Explain the difference between correlation and causation. How would you determine if there is a causal relationship?',
      evaluationCriteria: [
        'Clearly defines correlation vs. causation',
        'Identifies confounders and spurious relationships',
        'Discusses experimental vs. observational studies',
        'Mentions techniques like A/B testing, regression discontinuity',
        'Addresses causality in business contexts'
      ],
      sampleApproach: 'Correlation means variables move together but does not prove causation. To establish causality: run controlled experiments (A/B tests), use instrumental variables, or apply causal inference methods like propensity score matching.',
      followUpQuestions: [
        'How would you design an A/B test for this scenario?',
        'What are the ethical considerations in experimentation?'
      ]
    },
    {
      id: 'ds-4',
      category: 'NLP',
      difficulty: 'hard',
      question: 'How would you build a sentiment analysis model? What approach would you take for a domain-specific (e.g., medical) text?',
      evaluationCriteria: [
        'Discusses traditional vs. deep learning approaches',
        'Identifies importance of domain-specific training',
        'Considers pre-trained models (BERT, etc.)',
        'Addresses fine-tuning',
        'Mentions evaluation metrics'
      ],
      sampleApproach: 'Start with pre-trained transformer (BERT, RoBERTa). Fine-tune on domain-specific labeled data. Use data augmentation if needed. Consider lexicon-based approaches as baseline.',
      followUpQuestions: [
        'How do you handle sarcasm and irony?',
        'What about multilingual sentiment?'
      ]
    },
    {
      id: 'ds-5',
      category: 'Time Series',
      difficulty: 'hard',
      question: 'Explain the difference between ARIMA and Prophet for time series forecasting. When would you use each?',
      evaluationCriteria: [
        'Correctly explains both models',
        'Identifies strengths of each',
        'Considers data requirements',
        'Addresses seasonality handling',
        'Mentions implementation considerations'
      ],
      sampleApproach: 'ARIMA: statistical, good for stationary data, requires expertise. Prophet: easier, handles seasonality and holidays automatically, good for business forecasting. Choose based on data and team expertise.',
      followUpQuestions: [
        'How do you handle missing data in time series?',
        'What about intermittent demand?'
      ]
    },
    {
      id: 'ds-6',
      category: 'Feature Selection',
      difficulty: 'medium',
      question: 'How would you approach feature selection for a machine learning model with 1000 features?',
      evaluationCriteria: [
        'Discusses filter, wrapper, and embedded methods',
        'Identifies correlation analysis',
        'Considers feature importance from models',
        'Addresses dimensionality reduction',
        'Mentions domain knowledge'
      ],
      sampleApproach: 'Start with correlation analysis to remove redundancies. Use recursive feature elimination or LASSO. Get feature importance from tree-based models. Consider PCA for linear dimensionality reduction.',
      followUpQuestions: [
        'How do you know if you have enough features?',
        'What about feature interactions?'
      ]
    }
  ],
  'product-manager': [
    {
      id: 'pm-1',
      category: 'Product Strategy',
      difficulty: 'hard',
      question: 'Your company flagship product is losing market share to a new competitor. What would you do?',
      evaluationCriteria: [
        'Asks clarifying questions about the situation',
        'Proposes customer research approach',
        'Identifies competitive analysis framework',
        'Suggests prioritization framework for responses',
        'Considers short-term vs. long-term strategies'
      ],
      sampleApproach: 'Start with research: talk to customers, analyze competitor, review product analytics. Identify root causes (features, pricing, UX?). Then prioritize improvements based on impact and feasibility.',
      followUpQuestions: [
        'How would you prioritize feature requests in this situation?',
        'What metrics would you track to measure success?'
      ]
    },
    {
      id: 'pm-2',
      category: 'Prioritization',
      difficulty: 'medium',
      question: 'You have 10 feature requests and can only build 3. How do you prioritize?',
      evaluationCriteria: [
        'Uses a prioritization framework (RICE, MoSCoW, ICE)',
        'Considers customer impact vs. effort',
        'Addresses technical debt and dependencies',
        'Aligns with product strategy and OKRs',
        'Involves stakeholders appropriately'
      ],
      sampleApproach: 'Score each feature on Reach, Impact, Confidence, Effort (RICE). Consider strategic alignment with current goals. Factor in technical dependencies. Discuss trade-offs with stakeholders.',
      followUpQuestions: [
        'How do you handle a situation where engineering disagrees with your prioritization?',
        'What if a stakeholder with high authority demands their feature?'
      ]
    },
    {
      id: 'pm-3',
      category: 'User Research',
      difficulty: 'easy',
      question: 'How would you determine if users are satisfied with a new feature you just launched?',
      evaluationCriteria: [
        'Suggests quantitative metrics (NPS, CSAT, usage data)',
        'Proposes qualitative research (interviews, feedback)',
        'Addresses timeline for evaluation',
        'Considers segmenting users',
        'Discusses iteration based on findings'
      ],
      sampleApproach: 'Set up metrics before launch: NPS, task completion rate, feature adoption. After 2-4 weeks, conduct user interviews. Analyze cohort data. Look for patterns between satisfied and unsatisfied users.',
      followUpQuestions: [
        'What would you do if NPS is low but usage is high?',
        'How do you balance user feedback with data?'
      ]
    },
    {
      id: 'pm-4',
      category: 'Metrics',
      difficulty: 'medium',
      question: 'What metrics would you use to measure the success of a subscription product?',
      evaluationCriteria: [
        'Identifies key subscription metrics',
        'Discusses LTV and CAC',
        'Considers churn and retention',
        'Addresses engagement metrics',
        'Mentions cohort analysis'
      ],
      sampleApproach: 'Key metrics: MRR/ARR, Churn rate, LTV, CAC payback, Net Revenue Retention. Monitor engagement: DAU/MAU, feature usage. Track cohorts to understand retention curves.',
      followUpQuestions: [
        'How do you differentiate good vs. bad churn?',
        'What about expansion revenue?'
      ]
    },
    {
      id: 'pm-5',
      category: 'Launch',
      difficulty: 'medium',
      question: 'How would you plan a product launch? What are the key components?',
      evaluationCriteria: [
        'Discusses launch planning',
        'Identifies cross-functional work',
        'Considers go-to-market strategy',
        'Addresses communication plan',
        'Mentions post-launch analysis'
      ],
      sampleApproach: 'Define success criteria. Align sales/marketing/customer success. Create messaging and positioning. Prepare support materials. Execute in phases: beta, GA, expansion.',
      followUpQuestions: [
        'How do you handle a failed launch?',
        'What about phased rollouts?'
      ]
    },
    {
      id: 'pm-6',
      category: 'Roadmap',
      difficulty: 'medium',
      question: 'How do you create and maintain a product roadmap? How do you handle changes?',
      evaluationCriteria: [
        'Discusses roadmap creation',
        'Considers input from stakeholders',
        'Addresses time horizons',
        'Mentions communication',
        'Addresses flexibility'
      ],
      sampleApproach: 'Start with vision and strategy. Gather input from customers, sales, engineering. Prioritize using framework. Communicate with stakeholders. Leave room for unplanned but important work.',
      followUpQuestions: [
        'How do you say no to feature requests?',
        'What about technical debt on the roadmap?'
      ]
    }
  ],
  'devops': [
    {
      id: 'devops-1',
      category: 'Infrastructure',
      difficulty: 'hard',
      question: 'Your production database CPU is at 100% and the application is unresponsive. Walk through your troubleshooting steps.',
      evaluationCriteria: [
        'Prioritizes identifying and stopping bleeding',
        'Asks about current setup and symptoms',
        'Proposes diagnostic commands and tools',
        'Identifies common causes (queries, connections, memory)',
        'Discusses long-term prevention'
      ],
      sampleApproach: 'Immediate: Check active queries, kill long-running if needed, consider read replicas. Diagnostics: EXPLAIN for slow queries, check connection pool, monitor memory. Prevention: optimize queries, add caching, auto-scaling.',
      followUpQuestions: [
        'How would you prevent this from happening again?',
        'What monitoring would you implement?'
      ]
    },
    {
      id: 'devops-2',
      category: 'CI/CD',
      difficulty: 'medium',
      question: 'Your CI/CD pipeline takes 2 hours to run. How would you optimize it?',
      evaluationCriteria: [
        'Proposes parallelization strategies',
        'Suggests caching for dependencies',
        'Identifies what can be skipped (tests, builds)',
        'Discusses infrastructure improvements',
        'Considers what should be in pipeline vs. local'
      ],
      sampleApproach: 'Profile the pipeline to find bottlenecks. Parallelize independent stages. Cache dependencies (npm, maven, docker layers). Only run relevant tests on code changes. Consider incremental builds.',
      followUpQuestions: [
        'How do you balance speed vs. thoroughness?',
        'What tests are safe to skip in certain scenarios?'
      ]
    },
    {
      id: 'devops-3',
      category: 'Security',
      difficulty: 'medium',
      question: 'How would you handle a potential security vulnerability in a third-party dependency?',
      evaluationCriteria: [
        'Identifies the vulnerability assessment process',
        'Discusses immediate containment steps',
        'Proposes patching and update strategy',
        'Addresses scanning and monitoring for vulnerabilities',
        'Considers supply chain security'
      ],
      sampleApproach: 'Check CVE severity and if it is actually exploitable in your context. Isolate affected services if needed. Patch or upgrade dependency. Scan entire codebase for similar issues. Implement dependency scanning in CI.',
      followUpQuestions: [
        'How do you balance security patches with stability?',
        'What would you do if no patch is available?'
      ]
    },
    {
      id: 'devops-4',
      category: 'Observability',
      difficulty: 'medium',
      question: 'What is the difference between metrics, logs, and traces? When would you use each?',
      evaluationCriteria: [
        'Correctly defines each pillar',
        'Identifies use cases',
        'Discusses tools for each',
        'Considers cost implications',
        'Addresses correlation'
      ],
      sampleApproach: 'Metrics: numeric measurements over time (CPU, latency percentiles). Logs: discrete events with details. Traces: request path through distributed systems. Use together for full picture.',
      followUpQuestions: [
        'How do you handle log volume?',
        'What about distributed tracing?'
      ]
    },
    {
      id: 'devops-5',
      category: 'Kubernetes',
      difficulty: 'hard',
      question: 'A pod is in CrashLoopBackOff. How would you debug this?',
      evaluationCriteria: [
        'Discusses diagnostic commands',
        'Identifies common causes',
        'Considers resource issues',
        'Addresses application errors',
        'Mentions monitoring'
      ],
      sampleApproach: 'Check pod events and logs: kubectl describe pod, kubectl logs. Common causes: OOMKilled, liveness probe failures, application crashes, missing config. Check resource limits.',
      followUpQuestions: [
        'How would you prevent this?',
        'What about pod readiness issues?'
      ]
    },
    {
      id: 'devops-6',
      category: 'Backup',
      difficulty: 'medium',
      question: 'How would you design a backup and recovery strategy for a critical database?',
      evaluationCriteria: [
        'Discusses backup types (full, incremental, logical)',
        'Considers RPO and RTO',
        'Addresses testing restoration',
        'Mentions offsite storage',
        'Considers automation'
      ],
      sampleApproach: 'Define RPO/RTO requirements. Implement regular backups (daily full, hourly incremental). Test restore procedures quarterly. Store backups offsite. Automate with monitoring.',
      followUpQuestions: [
        'How do you handle human error in deletions?',
        'What about encryption of backups?'
      ]
    }
  ],
  'ux-designer': [
    {
      id: 'ux-1',
      category: 'User Research',
      difficulty: 'medium',
      question: 'How would you redesign the checkout flow for an e-commerce site to reduce cart abandonment?',
      evaluationCriteria: [
        'Proposes research approach to understand abandonment',
        'Identifies common pain points in checkout',
        'Suggests specific UX improvements',
        'Addresses mobile vs. desktop considerations',
        'Discusses testing approach'
      ],
      sampleApproach: 'Analyze analytics for drop-off points. Conduct user interviews. Common issues: too many steps, lack of trust signals, unexpected costs. Solutions: progress indicators, guest checkout, clear pricing.',
      followUpQuestions: [
        'How would you measure the success of your redesign?',
        'What if stakeholders disagree with your proposed changes?'
      ]
    },
    {
      id: 'ux-2',
      category: 'Design Systems',
      difficulty: 'easy',
      question: 'What is a design system and why is it important?',
      evaluationCriteria: [
        'Defines what a design system is',
        'Identifies key components (tokens, components, patterns)',
        'Discusses benefits for consistency and efficiency',
        'Addresses maintenance and adoption challenges',
        'Considers accessibility in design systems'
      ],
      sampleApproach: 'A design system is a collection of reusable components and guidelines. Benefits: consistency across products, faster development, easier onboarding. Includes design tokens, component library, documentation.',
      followUpQuestions: [
        'How would you convince leadership to invest in a design system?',
        'How do you handle a component that does not fit the system?'
      ]
    },
    {
      id: 'ux-3',
      category: 'Accessibility',
      difficulty: 'medium',
      question: 'How would you ensure a mobile app is accessible to users with disabilities?',
      evaluationCriteria: [
        'Understands different disability types (visual, motor, cognitive)',
        'Discusses WCAG guidelines',
        'Suggests testing approaches',
        'Addresses screen reader compatibility',
        'Considers motion sensitivity and other considerations'
      ],
      sampleApproach: 'Follow WCAG 2.1 guidelines. Test with actual assistive technologies. Ensure: proper contrast ratios, tap targets large enough, alternative text for images, keyboard navigation, reduced motion options.',
      followUpQuestions: [
        'How do you balance accessibility with design aesthetics?',
        'What tools would you use to test accessibility?'
      ]
    },
    {
      id: 'ux-4',
      category: 'User Testing',
      difficulty: 'medium',
      question: 'How would you conduct user testing for a new feature?',
      evaluationCriteria: [
        'Discusses testing methodology',
        'Identifies participant selection',
        'Considers testing environment',
        'Addresses task design',
        'Mentions analysis and synthesis'
      ],
      sampleApproach: 'Define research questions. Recruit representative users (5-7 is often enough). Create tasks that match real use cases. Observe and take notes. Analyze patterns and create recommendations.',
      followUpQuestions: [
        'How do you handle negative feedback?',
        'What about remote vs. in-person testing?'
      ]
    },
    {
      id: 'ux-5',
      category: 'Information Architecture',
      difficulty: 'medium',
      question: 'How would you organize information for a large content-heavy website?',
      evaluationCriteria: [
        'Discusses IA principles',
        'Considers user mental models',
        'Addresses navigation structure',
        'Mentions card sorting and tree testing',
        'Addresses search functionality'
      ],
      sampleApproach: 'Conduct card sorting to understand mental models. Create site hierarchy. Design navigation (global, local, contextual). Implement robust search. Test with users.',
      followUpQuestions: [
        'How do you handle content that fits multiple categories?',
        'What about faceted search?'
      ]
    },
    {
      id: 'ux-6',
      category: 'Mobile Design',
      difficulty: 'medium',
      question: 'What are the key differences between designing for mobile vs. desktop web?',
      evaluationCriteria: [
        'Identifies mobile-specific considerations',
        'Discusses touch vs. pointer',
        'Considers different contexts of use',
        'Addresses responsive design',
        'Mentions performance'
      ],
      sampleApproach: 'Mobile: thumb zone, larger touch targets, vertical scrolling, offline capability, performance (slower networks). Design mobile-first. Consider different intents (quick vs. extended use).',
      followUpQuestions: [
        'How do you handle complex interactions on mobile?',
        'What about foldable devices?'
      ]
    }
  ]
}

const domainLabels: Record<string, { label: string; icon: string }> = {
  'software-engineer': { label: 'Software Engineer', icon: '💻' },
  'frontend-developer': { label: 'Frontend Developer', icon: '🎨' },
  'backend-developer': { label: 'Backend Developer', icon: '⚙️' },
  'data-engineer': { label: 'Data Engineer', icon: '🏗️' },
  'machine-learning-engineer': { label: 'ML Engineer', icon: '🤖' },
  'cybersecurity-analyst': { label: 'Security Analyst', icon: '🔒' },
  'cloud-engineer': { label: 'Cloud Engineer', icon: '☁️' },
  'business-analyst': { label: 'Business Analyst', icon: '📈' },
  'technical-writer': { label: 'Technical Writer', icon: '📝' },
  'data-scientist': { label: 'Data Scientist', icon: '📊' },
  'product-manager': { label: 'Product Manager', icon: '📦' },
  'devops': { label: 'DevOps Engineer', icon: '🔧' },
  'ux-designer': { label: 'UX Designer', icon: '🎯' }
}

export default function DeepInterview() {
  const { colors } = useTheme()
  const [selectedDomain, setSelectedDomain] = useState<string>('')
  const [selectedScenario, setSelectedScenario] = useState<TechnicalScenario | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [currentFollowUp, setCurrentFollowUp] = useState(0)
  const [followUpAnswer, setFollowUpAnswer] = useState('')
  const [submittedAnswers, setSubmittedAnswers] = useState<string[]>([])
  const [showHint, setShowHint] = useState(false)

  const scenarios = selectedDomain ? domainScenarios[selectedDomain] || [] : []

  const startScenario = (scenario: TechnicalScenario) => {
    setSelectedScenario(scenario)
    setUserAnswer('')
    setShowEvaluation(false)
    setCurrentFollowUp(0)
    setFollowUpAnswer('')
    setSubmittedAnswers([])
    setShowHint(false)
  }

  const submitAnswer = () => {
    if (!userAnswer.trim()) return
    setSubmittedAnswers(prev => [...prev, userAnswer])
    setShowEvaluation(true)
  }

  const submitFollowUp = () => {
    if (!followUpAnswer.trim()) return
    setSubmittedAnswers(prev => [...prev, `Follow-up: ${followUpAnswer}`])
    if (selectedScenario && currentFollowUp < selectedScenario.followUpQuestions.length - 1) {
      setCurrentFollowUp(prev => prev + 1)
      setFollowUpAnswer('')
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: colors.bg,
      position: 'relative',
      overflow: 'hidden',
      color: colors.text,
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(51, 188, 101, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(18, 220, 239, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(95, 255, 217, 0.03) 0%, transparent 70%)
        `,
        pointerEvents: 'none'
      }} />
      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(51, 188, 101, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(51, 188, 101, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />
      <header style={{
        background: 'rgba(7, 7, 7, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(51, 188, 101, 0.2)',
        padding: '1rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              ♿
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#33BC65' }}>AccessPrep</span>
          </Link>
          <Link to="/dashboard" style={{ fontWeight: 600, color: '#a3a3a3', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ padding: '2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="animate-slide-up">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
                Domain-Specific Deep Interview
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#a3a3a3', maxWidth: '600px', margin: '0 auto' }}>
                Technical role-specific questions that evaluate your problem-solving approach, 
                not just your answers. Real interview preparation.
              </p>
            </div>

            {!selectedDomain ? (
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(51, 188, 101, 0.2)',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#ffffff' }}>Select Your Technical Domain</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  {Object.entries(domainLabels).map(([key, { label, icon }]) => (
                    <button
                      key={key}
                      onClick={() => { setSelectedDomain(key); setSelectedScenario(null); }}
                      style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '2px solid rgba(51, 188, 101, 0.3)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        color: '#a3a3a3'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
                      <div style={{ fontWeight: 600, color: '#ffffff' }}>{label}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : !selectedScenario ? (
              <div>
                <button
                  onClick={() => { setSelectedDomain(''); setSelectedScenario(null); }}
                  style={{ 
                    marginBottom: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#a3a3a3',
                    border: '1px solid rgba(51, 188, 101, 0.3)',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Domains
                </button>

                <div className="card" style={{ marginBottom: '1rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>
                    {domainLabels[selectedDomain]?.icon} {domainLabels[selectedDomain]?.label} Scenarios
                  </h3>
                  <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>
                    Choose a scenario to practice. Each includes evaluation criteria and follow-up questions.
                  </p>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {scenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className="card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => startScenario(scenario)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontWeight: 600 }}>{scenario.category}</span>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: getDifficultyColor(scenario.difficulty),
                            color: 'white'
                          }}>
                            {scenario.difficulty.toUpperCase()}
                          </span>
                        </div>
                        <span style={{ fontSize: '1.25rem' }}>→</span>
                      </div>
                      <p style={{ margin: 0, color: 'var(--gray)', fontSize: '0.9rem' }}>
                        {scenario.question.slice(0, 150)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedScenario(null)}
                  className="btn btn-secondary"
                  style={{ marginBottom: '1rem' }}
                >
                  ← Back to Scenarios
                </button>

                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontWeight: 600 }}>{selectedScenario.category}</span>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: getDifficultyColor(selectedScenario.difficulty),
                        color: 'white'
                      }}>
                        {selectedScenario.difficulty.toUpperCase()}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>
                      {currentFollowUp + 1} of {selectedScenario.followUpQuestions.length + 1}
                    </span>
                  </div>

                  {currentFollowUp === 0 ? (
                    <>
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Question:</h3>
                      <div style={{ 
                        padding: '1.5rem', 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '12px',
                        marginBottom: '1rem',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {selectedScenario.question}
                      </div>

                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="btn btn-secondary"
                        style={{ marginBottom: '1rem' }}
                      >
                        {showHint ? 'Hide Hint' : '💡 Show Approach Hint'}
                      </button>

                      {showHint && (
                        <div style={{ 
                          padding: '1rem', 
                          background: '#fef3c7', 
                          borderRadius: '8px',
                          marginBottom: '1rem',
                          borderLeft: '4px solid #f59e0b'
                        }}>
                          <strong>💡 Hint:</strong> {selectedScenario.sampleApproach}
                        </div>
                      )}

                      <textarea
                        className="input"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your approach and answer here. Explain your reasoning..."
                        rows={8}
                        style={{ marginBottom: '1rem' }}
                      />

                      <button
                        onClick={submitAnswer}
                        className="btn btn-primary"
                        disabled={!userAnswer.trim()}
                        style={{ width: '100%' }}
                      >
                        Submit Answer
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ 
                        padding: '1.5rem', 
                        background: '#dbeafe', 
                        borderRadius: '12px',
                        marginBottom: '1rem',
                        borderLeft: '4px solid #3b82f6'
                      }}>
                        <strong>Follow-up Question {currentFollowUp}:</strong>
                        <p style={{ margin: '0.5rem 0 0 0' }}>
                          {selectedScenario.followUpQuestions[currentFollowUp - 1]}
                        </p>
                      </div>

                      <textarea
                        className="input"
                        value={followUpAnswer}
                        onChange={(e) => setFollowUpAnswer(e.target.value)}
                        placeholder="Your follow-up answer..."
                        rows={4}
                        style={{ marginBottom: '1rem' }}
                      />

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                          onClick={submitFollowUp}
                          className="btn btn-primary"
                          disabled={!followUpAnswer.trim()}
                          style={{ flex: 1 }}
                        >
                          {currentFollowUp < selectedScenario.followUpQuestions.length ? 'Submit Follow-up' : 'Complete'}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {showEvaluation && (
                  <div className="card" style={{ 
                    background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                    marginBottom: '1.5rem'
                  }}>
                    <h4 style={{ marginBottom: '1rem' }}>✓ Evaluation Criteria</h4>
                    <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                      A strong answer should address these points:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                      {selectedScenario.evaluationCriteria.map((criteria, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem' }}>{criteria}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {submittedAnswers.length > 0 && (
                  <div className="card">
                    <h4 style={{ marginBottom: '1rem' }}>📝 Your Responses</h4>
                    {submittedAnswers.map((answer, idx) => (
                      <div key={idx} style={{ 
                        padding: '1rem', 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '8px',
                        marginBottom: '0.75rem'
                      }}>
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
                          {answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)' }}>
              <h3 style={{ marginBottom: '1rem' }}>🎯 How Deep Interview Works</h3>
              <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Scenario-Based</strong> - Real-world technical problems specific to your role
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Approach Matters</strong> - We evaluate your thinking process, not just the answer
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Follow-Up Questions</strong> - Just like real interviews, you\'ll get probing questions
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Evaluation Criteria</strong> - Know exactly what interviewers look for
                </li>
                <li>
                  <strong>Hints Available</strong> - Stuck? Use hints to guide your approach
                </li>
              </ul>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/interview" className="btn btn-secondary">
                🎤 Standard Mock Interview
              </Link>
              <Link to="/mentor" className="btn btn-secondary">
                🤖 AI Mentor
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
