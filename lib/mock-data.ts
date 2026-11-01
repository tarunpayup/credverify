import { Professional, Appointment, Review, VerificationRequest, DisputeTicket, BlogPost, UserAccount } from './types';

export const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: 'prof-ca-1',
    name: 'CA Rajesh Malhotra',
    title: 'Senior Partner & Tax Litigation Counsel',
    profession: 'Chartered Accountant',
    city: 'Mumbai',
    avatarUrl: '/images/avatar_ca.jpg',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 142,
    peerReviewScore: 4.96,
    licenseNumber: 'ICAI-FCA-084920',
    licensingBody: 'Institute of Chartered Accountants of India (ICAI)',
    verificationStatus: 'verified',
    peerVouchCount: 19,
    consultationFee: 2500,
    specialties: ['Corporate Tax Audits', 'International Transfer Pricing', 'GST Appeals', 'Mergers & Acquisitions'],
    bio: 'Fellow Chartered Accountant (FCA) with 16+ years handling cross-border taxation, direct tax tribunal appeals, and forensic corporate audits for listed enterprises and high-growth technology startups.',
    education: 'B.Com (Hons), St. Xavier’s College Mumbai · Fellow Chartered Accountant (ICAI) · DISA (Information Systems Audit)',
    officeAddress: 'Suite 602, Nariman Point Financial Center, Mumbai 400021',
    email: 'rajesh.malhotra@fca-advisors.in',
    phone: '+91 22 4910 8820',
    joinedDate: 'Jan 2024',
    featured: true,
    services: [
      {
        id: 'srv-ca-1',
        title: 'Statutory Corporate Tax & GST Advisory',
        description: 'Comprehensive evaluation of tax liabilities, filing deadlines, and advance rulings with detailed memorandum.',
        durationMinutes: 45,
        price: 2500,
        mode: 'Video Call',
        turnaroundTime: 'Same Day'
      },
      {
        id: 'srv-ca-2',
        title: 'Tax Audit & Assessment Representation',
        description: 'Filing responses to tax notices, representation before appellate tribunals, and scrutiny management.',
        durationMinutes: 90,
        price: 7500,
        mode: 'In-Person Consultation',
        turnaroundTime: '2 Business Days'
      },
      {
        id: 'srv-ca-3',
        title: 'Startup ESOP & Cap Table Tax Structuring',
        description: 'Structuring cross-border equity incentive plans with minimal tax leakage under section 56(2) compliance.',
        durationMinutes: 60,
        price: 5000,
        mode: 'Video Call',
        turnaroundTime: '24 Hours'
      }
    ],
    peerVouches: [
      {
        id: 'vouch-1',
        voucherId: 'prof-ca-2',
        voucherName: 'CA Sneha Kulkarni',
        voucherProfession: 'Chartered Accountant',
        voucherRegNo: 'ICAI-ACA-112094',
        relationship: 'Council Peer',
        comment: 'Worked alongside Rajesh on complex transfer-pricing documentation for international holding companies. Uncompromising integrity and encyclopedic direct tax knowledge.',
        date: '2025-10-14',
        verified: true
      },
      {
        id: 'vouch-2',
        voucherId: 'prof-lawyer-1',
        voucherName: 'Adv. Vikram Singhania',
        voucherProfession: 'Lawyer',
        voucherRegNo: 'BCI-MH-9482/2006',
        relationship: 'Former Colleague',
        comment: 'Co-briefed Rajesh on NCLT corporate insolvency matters. His forensic accounting reports withstand rigorous scrutiny in appellate tribunals.',
        date: '2025-08-22',
        verified: true
      }
    ]
  },
  {
    id: 'prof-doc-1',
    name: 'Dr. Ananya Jenkins',
    title: 'Consultant Cardiologist & Internal Medicine',
    profession: 'Doctor',
    city: 'Bengaluru',
    avatarUrl: '/images/avatar_doctor.jpg',
    experienceYears: 13,
    rating: 4.95,
    reviewCount: 218,
    peerReviewScore: 4.98,
    licenseNumber: 'NMC-KMC-73891',
    licensingBody: 'National Medical Commission (NMC)',
    verificationStatus: 'verified',
    peerVouchCount: 24,
    consultationFee: 1800,
    specialties: ['Preventive Cardiology', 'Lipidology', 'Hypertension Management', 'Echocardiography Review'],
    bio: 'Board-certified cardiologist specializing in non-invasive cardiac evaluation, early cardiovascular risk stratification, and patient-centered clinical management with evidence-based protocols.',
    education: 'MBBS, Kasturba Medical College · MD General Medicine · DM Cardiology, Narayana Institute of Cardiac Sciences',
    officeAddress: 'Apex Health Tower, 4th Block Koramangala, Bengaluru 560034',
    email: 'dr.ananya@cardioapex.org',
    phone: '+91 80 6192 4400',
    joinedDate: 'Mar 2024',
    featured: true,
    services: [
      {
        id: 'srv-doc-1',
        title: 'Cardiac Evaluation & Prescription Review',
        description: 'Comprehensive review of ECG, 2D Echo reports, lipid profile, and personalized medication titration.',
        durationMinutes: 30,
        price: 1800,
        mode: 'Video Call',
        turnaroundTime: 'Instant / Next Slot'
      },
      {
        id: 'srv-doc-2',
        title: 'Second Opinion on Angiography & Intervention',
        description: 'Independent clinical review of coronary angiogram DICOM films and conservative treatment vs stent planning.',
        durationMinutes: 45,
        price: 3200,
        mode: 'Document Review & Audit',
        turnaroundTime: '24 Hours'
      }
    ],
    peerVouches: [
      {
        id: 'vouch-3',
        voucherId: 'prof-doc-2',
        voucherName: 'Dr. Tarun Nambiar',
        voucherProfession: 'Doctor',
        voucherRegNo: 'NMC-MMC-55102',
        relationship: 'Clinical Associate',
        comment: 'Dr. Jenkins exhibits surgical precision in diagnostic cardiography. Her patient safety standards are widely emulated across our tertiary care hospital network.',
        date: '2025-11-02',
        verified: true
      }
    ]
  },
  {
    id: 'prof-lawyer-1',
    name: 'Adv. Vikramaditya Singhania',
    title: 'Senior Advocate · Commercial Dispute & Arbitration',
    profession: 'Lawyer',
    city: 'Delhi NCR',
    avatarUrl: '/images/avatar_lawyer.jpg',
    experienceYears: 21,
    rating: 4.88,
    reviewCount: 97,
    peerReviewScore: 4.92,
    licenseNumber: 'BCI-D-1940/2004',
    licensingBody: 'Bar Council of India / High Court of Delhi',
    verificationStatus: 'verified',
    peerVouchCount: 31,
    consultationFee: 3500,
    specialties: ['Commercial Contracts', 'Dispute Resolution', 'Shareholder Agreements', 'Intellectual Property'],
    bio: 'Advocate on Record representing enterprises before the High Court and Supreme Court. Specialized in cross-border joint venture agreements, software licensing disputes, and corporate mediation.',
    education: 'B.A. LL.B (Hons), National Law School of India University (NLSIU) · LL.M, Cambridge University',
    officeAddress: 'Chambers 14, Supreme Court Lawyers Complex, Bhagwan Das Road, New Delhi 110001',
    email: 'singhania@delhichambers.law',
    phone: '+91 11 2338 9012',
    joinedDate: 'Feb 2024',
    featured: true,
    services: [
      {
        id: 'srv-law-1',
        title: 'Commercial Contract & NDA Risk Analysis',
        description: 'Comprehensive redline review of SaaS agreements, vendor retainers, and indemnification exposure.',
        durationMinutes: 45,
        price: 3500,
        mode: 'Video Call',
        turnaroundTime: 'Same Day'
      },
      {
        id: 'srv-law-2',
        title: 'Legal Notice Drafting & Pre-Litigation Advisory',
        description: 'Drafting formal demand notices for breach of contract, debt recovery, or trademark infringement.',
        durationMinutes: 60,
        price: 8000,
        mode: 'Document Review & Audit',
        turnaroundTime: '48 Hours'
      }
    ],
    peerVouches: [
      {
        id: 'vouch-4',
        voucherId: 'prof-lawyer-2',
        voucherName: 'Adv. Devika Deshmukh',
        voucherProfession: 'Lawyer',
        voucherRegNo: 'BCI-MH-7714/2009',
        relationship: 'Senior Partner',
        comment: 'Advocate Singhania’s oral arguments and litigation strategies are exemplary. A stalwart of the Bar Council with impeccable ethical standards.',
        date: '2025-09-08',
        verified: true
      }
    ]
  },
  {
    id: 'prof-tech-1',
    name: 'Priya Sundaram',
    title: 'Principal Distributed Systems Architect',
    profession: 'Software Engineer',
    city: 'Bengaluru',
    avatarUrl: '/images/avatar_doctor.jpg', // clean portrait
    experienceYears: 14,
    rating: 4.96,
    reviewCount: 89,
    peerReviewScore: 4.99,
    licenseNumber: 'IEEE-SENIOR-902418',
    licensingBody: 'IEEE Senior Member / Certified Cloud Solutions Architect',
    verificationStatus: 'verified',
    peerVouchCount: 28,
    consultationFee: 3000,
    specialties: ['High-Throughput Microservices', 'Kafka & Event-Driven Architecture', 'Cloud Migration', 'Security & Scale Audit'],
    bio: 'Former BigTech Staff Engineer leading distributed systems handling 100k+ QPS. Advises CTOs, engineering VPs, and founders on latency reduction, zero-downtime database migrations, and resilience.',
    education: 'B.Tech Computer Science, IIT Madras · M.S. Distributed Computing, CMU',
    officeAddress: 'Indiranagar Tech Enclave, 100ft Road, Bengaluru 560038',
    email: 'priya.sundaram@systemscale.dev',
    phone: '+91 80 4099 2170',
    joinedDate: 'Jan 2024',
    featured: true,
    services: [
      {
        id: 'srv-tech-1',
        title: 'System Architecture & Bottleneck Audit',
        description: 'Deep dive into your architectural diagrams, latency spikes, and database deadlocks with written action plan.',
        durationMinutes: 60,
        price: 3000,
        mode: 'Video Call',
        turnaroundTime: '24 Hours'
      },
      {
        id: 'srv-tech-2',
        title: 'Cloud Cost Optimization & Multi-Region Setup',
        description: 'Comprehensive AWS/GCP infrastructure inspection targeting 30-45% cost reduction without SLA compromise.',
        durationMinutes: 90,
        price: 6500,
        mode: 'Video Call',
        turnaroundTime: '2 Business Days'
      }
    ],
    peerVouches: [
      {
        id: 'vouch-5',
        voucherId: 'prof-tech-2',
        voucherName: 'Marcus Vance',
        voucherProfession: 'Software Engineer',
        voucherRegNo: 'ACM-PROF-338192',
        relationship: 'Former Colleague',
        comment: 'Priya designed our transaction processing pipelines during our Series C scaleup. Her rigor with consensus protocols and distributed fault tolerance is world-class.',
        date: '2025-10-18',
        verified: true
      }
    ]
  },
  {
    id: 'prof-arch-1',
    name: 'Ar. Kabir Sen',
    title: 'Principal Architect & Urban Design Director',
    profession: 'Architect',
    city: 'Mumbai',
    avatarUrl: '/images/avatar_ca.jpg',
    experienceYears: 18,
    rating: 4.84,
    reviewCount: 64,
    peerReviewScore: 4.88,
    licenseNumber: 'COA-CA/2007/41890',
    licensingBody: 'Council of Architecture (COA)',
    verificationStatus: 'verified',
    peerVouchCount: 15,
    consultationFee: 2800,
    specialties: ['Sustainable Residential Architecture', 'Commercial Building Sanctions', 'Structural Integrity Review', 'LEED Certification'],
    bio: 'Registered architect with Council of Architecture holding 18 years expertise in bioclimatic modern dwellings, municipal development permissions, and heritage conservation in metropolitan areas.',
    education: 'B.Arch, Sir J.J. College of Architecture · M.Arch Sustainable Urbanism, CEPT University',
    officeAddress: 'Bandra West Creative Quarter, Turner Road, Mumbai 400050',
    email: 'kabir@senarchitects.co.in',
    phone: '+91 22 2640 1883',
    joinedDate: 'Apr 2024',
    featured: false,
    services: [
      {
        id: 'srv-arch-1',
        title: 'Preliminary Plot & Floor Plan Feasibility',
        description: 'Zoning regulation audit, FSI/FAR calculation, and initial schematic layout consultation.',
        durationMinutes: 45,
        price: 2800,
        mode: 'Video Call',
        turnaroundTime: 'Same Day'
      }
    ],
    peerVouches: [
      {
        id: 'vouch-6',
        voucherId: 'prof-arch-2',
        voucherName: 'Ar. Tanvi Shah',
        voucherProfession: 'Architect',
        voucherRegNo: 'COA-CA/2011/52901',
        relationship: 'Council Peer',
        comment: 'Kabir is one of the most conscientious architects in western India. His drawings strictly adhere to National Building Code specifications.',
        date: '2025-07-11',
        verified: true
      }
    ]
  },
  {
    id: 'prof-ca-2',
    name: 'CA Sneha Kulkarni',
    title: 'Partner · Startup Compliance & Due Diligence',
    profession: 'Chartered Accountant',
    city: 'Pune',
    avatarUrl: '/images/avatar_doctor.jpg',
    experienceYears: 11,
    rating: 4.91,
    reviewCount: 118,
    peerReviewScore: 4.94,
    licenseNumber: 'ICAI-ACA-112094',
    licensingBody: 'Institute of Chartered Accountants of India (ICAI)',
    verificationStatus: 'verified',
    peerVouchCount: 17,
    consultationFee: 2000,
    specialties: ['Startup Valuation (Rule 11UA)', 'Angel Tax Clearances', 'FEMA Compliance', 'Statutory Audits'],
    bio: 'Practicing Chartered Accountant assisting founders with seed through Series B fundraising compliance, investor diligence reports, and cross-border remittance under FEMA RBI regulations.',
    education: 'B.Com, Pune University · ACA (ICAI) · Certified Valuation Analyst (CVA)',
    officeAddress: 'Senapati Bapat Road Corporate Park, Pune 411016',
    email: 'sneha@kulkarnica.in',
    phone: '+91 20 2567 9821',
    joinedDate: 'May 2024',
    featured: false,
    services: [
      {
        id: 'srv-ca-4',
        title: 'Statutory 11UA Valuation & Cap Table Audit',
        description: 'Discounted Cash Flow (DCF) valuation certificate mandated for investor share allotment under the Income Tax Act.',
        durationMinutes: 60,
        price: 4500,
        mode: 'Document Review & Audit',
        turnaroundTime: '3 Business Days'
      }
    ],
    peerVouches: [
      {
        id: 'vouch-7',
        voucherId: 'prof-ca-1',
        voucherName: 'CA Rajesh Malhotra',
        voucherProfession: 'Chartered Accountant',
        voucherRegNo: 'ICAI-FCA-084920',
        relationship: 'Council Peer',
        comment: 'Sneha provides bulletproof valuations. Her diligence memos are respected by tier-1 venture capital funds across India.',
        date: '2025-09-19',
        verified: true
      }
    ]
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    customerId: 'cust-1',
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav.mehta@fintechventures.io',
    providerId: 'prof-ca-1',
    providerName: 'CA Rajesh Malhotra',
    providerProfession: 'Chartered Accountant',
    serviceId: 'srv-ca-1',
    serviceTitle: 'Statutory Corporate Tax & GST Advisory',
    dateTime: '2026-11-04',
    timeSlot: '11:00 AM - 11:45 AM',
    fee: 2500,
    status: 'confirmed',
    consultationType: 'Video Call',
    meetingLink: 'https://meet.credverify.internal/room-ca-rajesh-101',
    notes: 'Need clarity on GST input tax credit reversal for capital goods acquired under SEZ unit.',
    createdAt: '2026-10-30'
  },
  {
    id: 'apt-102',
    customerId: 'cust-2',
    customerName: 'Sunita Rao',
    customerEmail: 'sunita.rao@techscale.co',
    providerId: 'prof-doc-1',
    providerName: 'Dr. Ananya Jenkins',
    providerProfession: 'Doctor',
    serviceId: 'srv-doc-1',
    serviceTitle: 'Cardiac Evaluation & Prescription Review',
    dateTime: '2026-11-03',
    timeSlot: '04:30 PM - 05:00 PM',
    fee: 1800,
    status: 'confirmed',
    consultationType: 'Video Call',
    meetingLink: 'https://meet.credverify.internal/room-doc-ananya-102',
    notes: 'Holter monitor report attached for follow-up review after palpitations episode.',
    createdAt: '2026-10-31'
  },
  {
    id: 'apt-103',
    customerId: 'cust-1',
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav.mehta@fintechventures.io',
    providerId: 'prof-lawyer-1',
    providerName: 'Adv. Vikramaditya Singhania',
    providerProfession: 'Lawyer',
    serviceId: 'srv-law-1',
    serviceTitle: 'Commercial Contract & NDA Risk Analysis',
    dateTime: '2026-10-24',
    timeSlot: '02:00 PM - 02:45 PM',
    fee: 3500,
    status: 'completed',
    consultationType: 'Video Call',
    meetingLink: 'https://meet.credverify.internal/room-law-vikram-103',
    notes: 'Reviewed cross-border supplier agreement. Indemnity clause amended successfully.',
    createdAt: '2026-10-20'
  },
  {
    id: 'apt-104',
    customerId: 'cust-3',
    customerName: 'Rohit Verma',
    customerEmail: 'rohit.v@innovatetech.com',
    providerId: 'prof-tech-1',
    providerName: 'Priya Sundaram',
    providerProfession: 'Software Engineer',
    serviceId: 'srv-tech-1',
    serviceTitle: 'System Architecture & Bottleneck Audit',
    dateTime: '2026-11-05',
    timeSlot: '06:00 PM - 07:00 PM',
    fee: 3000,
    status: 'confirmed',
    consultationType: 'Video Call',
    meetingLink: 'https://meet.credverify.internal/room-tech-priya-104',
    notes: 'Reviewing our Redis cluster sharding and read-replica replication lag.',
    createdAt: '2026-11-01'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    professionalId: 'prof-ca-1',
    professionalName: 'CA Rajesh Malhotra',
    customerId: 'cust-1',
    customerName: 'Aarav Mehta',
    rating: 5,
    date: '2026-10-25',
    comment: 'CA Rajesh is exceptionally thorough. He identified a 12% excess GST liability in our subsidiary ledger and helped us file for a formal refund. Outstanding professionalism.',
    verifiedBooking: true,
    providerResponse: {
      text: 'Thank you Aarav. Glad we could resolve the reconciliation mismatch ahead of the quarterly deadline.',
      date: '2026-10-26'
    }
  },
  {
    id: 'rev-2',
    professionalId: 'prof-doc-1',
    professionalName: 'Dr. Ananya Jenkins',
    customerId: 'cust-2',
    customerName: 'Sunita Rao',
    rating: 5,
    date: '2026-10-18',
    comment: 'Dr. Ananya explained my echocardiogram readings with immense clarity. She took time to answer all my concerns regarding medication side effects. Unmatched bedside manner.',
    verifiedBooking: true
  },
  {
    id: 'rev-3',
    professionalId: 'prof-lawyer-1',
    professionalName: 'Adv. Vikramaditya Singhania',
    customerId: 'cust-4',
    customerName: 'Karan Thapar',
    rating: 5,
    date: '2026-10-09',
    comment: 'Advocate Singhania’s contract markup saved our business from onerous unlimited liability terms. Truly top tier commercial counsel.',
    verifiedBooking: true
  }
];

export const INITIAL_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'req-ver-001',
    providerId: 'prof-ca-pending-1',
    providerName: 'CA Neeraj Agarwal',
    profession: 'Chartered Accountant',
    licenseNumber: 'ICAI-ACA-190422',
    licensingBody: 'Institute of Chartered Accountants of India (ICAI)',
    documentName: 'ICAI_COP_Certificate_2026.pdf',
    documentType: 'License',
    submissionDate: '2026-10-31',
    status: 'pending',
    peerVouchesGathered: 3,
    peerVouchesTarget: 3,
    notes: 'Certificate of Practice verified against ICAI portal database. Ready for Super Admin final approval.'
  },
  {
    id: 'req-ver-002',
    providerId: 'prof-doc-pending-2',
    providerName: 'Dr. Sameer Quadri',
    profession: 'Doctor',
    licenseNumber: 'NMC-TSMC-49102',
    licensingBody: 'National Medical Commission (NMC)',
    documentName: 'Telangana_State_Medical_Council_Reg.pdf',
    documentType: 'License',
    submissionDate: '2026-11-01',
    status: 'pending',
    peerVouchesGathered: 2,
    peerVouchesTarget: 3,
    notes: 'Awaiting 1 additional peer vouch from a registered orthopedic specialist.'
  },
  {
    id: 'req-ver-003',
    providerId: 'prof-law-pending-3',
    providerName: 'Adv. Shreya Bansal',
    profession: 'Lawyer',
    licenseNumber: 'BCI-UP-8120/2015',
    licensingBody: 'Bar Council of India / Allahabad High Court',
    documentName: 'Bar_Council_Enrolment_Sanad.pdf',
    documentType: 'Bar Council Roll',
    submissionDate: '2026-10-28',
    status: 'approved',
    peerVouchesGathered: 4,
    peerVouchesTarget: 3,
    notes: 'Enrolment Sanad cross-verified. 4 senior advocates confirmed active practice.'
  }
];

export const INITIAL_DISPUTES: DisputeTicket[] = [
  {
    id: 'disp-201',
    ticketNumber: 'DISP-8902',
    customerName: 'Manish Chawla',
    customerEmail: 'm.chawla@retailgroup.in',
    providerName: 'CA Rajesh Malhotra',
    providerProfession: 'Chartered Accountant',
    issueType: 'Billing Inquiry',
    status: 'investigating',
    dateOpened: '2026-10-29',
    description: 'Client was billed for an extended 90-minute advisory while the session concluded at 45 minutes due to technical connectivity drop.'
  },
  {
    id: 'disp-202',
    ticketNumber: 'DISP-8840',
    customerName: 'Pooja Hegde',
    customerEmail: 'pooja.h@creativestudio.com',
    providerName: 'Ar. Kabir Sen',
    providerProfession: 'Architect',
    issueType: 'Service Quality',
    status: 'resolved',
    dateOpened: '2026-10-15',
    description: 'Client requested schematic revisions within standard SLA. Resolved with rescheduled complimentary 30-min revision session.',
    resolution: 'Provider completed complimentary 30-min design walkthrough. Client confirmed satisfaction.'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Peer-Verification Standard: Why Public Directory Badges Are Broken',
    category: 'Regulatory & Law',
    authorName: 'Adv. Vikramaditya Singhania',
    authorRole: 'Senior Commercial Advocate',
    authorProfession: 'Lawyer',
    readTime: '5 min read',
    date: 'Oct 28, 2026',
    excerpt: 'Traditional local listing directories rely on self-reported certificates that are easily spoofed. Here is how peer-vouched multi-signature auditing guarantees authenticity.',
    content: [
      'In traditional unverified directory models, any business owner could purchase a sponsored listing or upload a stock certificate without council verification.',
      'In specialized professions—Chartered Accountancy, Medicine, Law, Structural Architecture, and Critical Infrastructure Engineering—misrepresentation causes catastrophic economic and personal harm.',
      'CredVerify introduces the Peer-Vouched Multi-Signature Standard: A professional must not only produce an official license number checked against statutory rolls (ICAI, NMC, BCI, COA), but must also receive verifiable endorsements from at least 3 active peers in good standing.',
      'This closes the loop between public registries and practical peer repute, ensuring consumers can book consultations with absolute confidence.'
    ],
    tags: ['Credential Verification', 'Bar Council', 'Consumer Protection', 'ICAI Standards']
  },
  {
    id: 'blog-2',
    title: 'Key Tax Deadlines & Advance Rulings for Startups in FY 2026-27',
    category: 'Chartered Accountant',
    authorName: 'CA Rajesh Malhotra',
    authorRole: 'Fellow Chartered Accountant',
    authorProfession: 'Chartered Accountant',
    readTime: '6 min read',
    date: 'Oct 22, 2026',
    excerpt: 'A practical roadmap for corporate founders on transfer pricing documentation, angel tax compliance under Section 56(2), and GST input credit rules.',
    content: [
      'Corporate compliance cycles in 2026 require early preparation rather than eleventh-hour scramble. Here are the 4 non-negotiable compliance pillars for founders:',
      '1. Rule 11UA DCF Valuations: Ensure your merchant banker or chartered accountant valuation matches actual cash flow variance within permissible bands.',
      '2. Input Tax Credit (ITC) Matching: Automated GSTR-2B scrutiny notices are now algorithmically dispatched within 72 hours of supplier default.',
      '3. Cross-Border Software Royalties: With updated equalization levy exemptions, cross-border cloud SaaS subscriptions require specific withholding certificates to avoid disallowance.'
    ],
    tags: ['Corporate Tax', 'GST', 'Startup Valuation', 'ICAI Guidance']
  },
  {
    id: 'blog-3',
    title: 'Distributed System Resilience: Designing for Failure at 100k QPS',
    category: 'Software Engineer',
    authorName: 'Priya Sundaram',
    authorRole: 'Principal Systems Architect',
    authorProfession: 'Software Engineer',
    readTime: '7 min read',
    date: 'Oct 15, 2026',
    excerpt: 'Architectural lessons from production outages: why circuit breakers alone fail, how to tame cascading retry storms, and idempotency guarantees in payment ledgers.',
    content: [
      'When microservices scale beyond hundreds of distributed nodes, network partitions and slow downstream dependencies are not exceptional states—they are the default operating condition.',
      'To build peer-trusted software infrastructure, engineers must implement bounded exponential backoff with full jitter, strict timeout budgets across gRPC call graphs, and deterministic idempotency keys.',
      'Always test catastrophic partition scenarios using automated chaos injection before handling real transaction volume.'
    ],
    tags: ['System Architecture', 'Distributed Systems', 'Cloud Scale', 'IEEE Standards']
  }
];

export const DEMO_USERS: Record<string, UserAccount> = {
  customer: {
    id: 'cust-1',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@fintechventures.io',
    role: 'customer',
    phone: '+91 98201 55410',
    city: 'Mumbai'
  },
  provider_ca: {
    id: 'user-prof-ca-1',
    name: 'CA Rajesh Malhotra',
    email: 'rajesh.malhotra@fca-advisors.in',
    role: 'provider',
    profession: 'Chartered Accountant',
    licenseNumber: 'ICAI-FCA-084920',
    providerProfileId: 'prof-ca-1',
    city: 'Mumbai'
  },
  provider_doc: {
    id: 'user-prof-doc-1',
    name: 'Dr. Ananya Jenkins',
    email: 'dr.ananya@cardioapex.org',
    role: 'provider',
    profession: 'Doctor',
    licenseNumber: 'NMC-KMC-73891',
    providerProfileId: 'prof-doc-1',
    city: 'Bengaluru'
  },
  admin: {
    id: 'admin-super-1',
    name: 'Platform Overseer (Admin)',
    email: 'governance@credverify.internal',
    role: 'superadmin',
    city: 'Mumbai'
  }
};
