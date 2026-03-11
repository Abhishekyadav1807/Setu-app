import mongoose from 'mongoose';
import Law from '../models/Law.js';
import Procedure from '../models/Procedure.js';
import Scheme from '../models/Scheme.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/setu-platform';

const laws = [
  {
    slug: 'constitution-basics',
    title: 'Constitution of India – Basics',
    category: 'Constitutional Law',
    icon: '🏛️',
    overview: 'The Constitution of India is the supreme law of India. It was adopted on 26 November 1949 and came into effect on 26 January 1950. It establishes the framework for political principles, procedures, rights, and duties of the government and citizens. India is the world\'s largest democracy, and its Constitution is one of the longest written constitutions with 448 Articles in 25 Parts, 12 Schedules, and over 100 Amendments. It guarantees Fundamental Rights to all citizens including Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.',
    keySections: [
      { section: 'Part III (Articles 12-35)', title: 'Fundamental Rights', description: 'Guarantees six fundamental rights: Right to Equality (Art 14-18), Right to Freedom (Art 19-22), Right against Exploitation (Art 23-24), Right to Freedom of Religion (Art 25-28), Cultural & Educational Rights (Art 29-30), Right to Constitutional Remedies (Art 32).' },
      { section: 'Part IV (Articles 36-51)', title: 'Directive Principles of State Policy', description: 'Guidelines for the government to create social and economic conditions for a just society. Not enforceable by courts but fundamental in governance. Includes provisions for equal pay, living wages, free legal aid, and protection of environment.' },
      { section: 'Part IVA (Article 51A)', title: 'Fundamental Duties', description: '11 duties added by 42nd Amendment (1976). Includes respecting the Constitution, national flag and anthem, cherishing ideals of freedom struggle, promoting harmony, safeguarding public property, and developing scientific temper.' },
      { section: 'Article 32', title: 'Right to Constitutional Remedies', description: 'Dr. B.R. Ambedkar called this the "heart and soul of the Constitution." Citizens can directly approach the Supreme Court for enforcement of fundamental rights through writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.' },
      { section: 'Article 21', title: 'Right to Life and Personal Liberty', description: 'No person shall be deprived of life or personal liberty except according to procedure established by law. Through judicial interpretation, this includes right to live with dignity, right to livelihood, right to health, right to education, right to clean environment, and right to privacy.' }
    ],
    examples: [
      { title: 'Right to Education', scenario: 'A poor family cannot afford school fees for their 8-year-old child.', outcome: 'Under Article 21A and Right to Education Act 2009, every child aged 6-14 has the right to free and compulsory education in neighborhood school. 25% seats in private schools are reserved for economically weaker sections.' },
      { title: 'Right to Equality', scenario: 'A private company refuses to hire someone based on caste.', outcome: 'Under Article 15, discrimination on grounds of religion, race, caste, sex, or place of birth is prohibited. The affected person can file a complaint under the SC/ST Prevention of Atrocities Act and seek damages in court.' },
      { title: 'Right to Information', scenario: 'A citizen wants to know how government funds were spent in their village.', outcome: 'Under RTI Act 2005 (traced to Article 19(1)(a) - Freedom of Speech), any citizen can seek information from any public authority by paying ₹10 fee. Response must be given within 30 days.' }
    ],
    useCases: [
      { title: 'Filing PIL (Public Interest Litigation)', description: 'Any citizen can file a PIL in the High Court (Article 226) or Supreme Court (Article 32) for enforcement of fundamental rights of the public at large. No court fee required. Can be filed by writing a letter to the Chief Justice.' },
      { title: 'Challenging Unjust Laws', description: 'If a law violates fundamental rights, citizens can challenge it through judicial review. Courts can declare laws unconstitutional under Article 13.' },
      { title: 'Seeking Legal Aid', description: 'Article 39A provides for free legal aid to economically weaker sections. NALSA (National Legal Services Authority) and state LSAs provide free lawyers and waive court fees.' },
      { title: 'Protection During Arrest', description: 'Article 22 guarantees: right to be informed of grounds of arrest, right to consult a lawyer, and right to be produced before a magistrate within 24 hours.' }
    ],
    importantLinks: [
      { label: 'Constitution of India (Full Text)', url: 'https://legislative.gov.in/constitution-of-india/' },
      { label: 'Supreme Court of India', url: 'https://main.sci.gov.in/' },
      { label: 'NALSA - Free Legal Aid', url: 'https://nalsa.gov.in/' }
    ]
  },
  {
    slug: 'consumer-protection-act',
    title: 'Consumer Protection Act, 2019',
    category: 'Consumer Law',
    icon: '🛒',
    overview: 'The Consumer Protection Act 2019 replaced the older 1986 Act and provides stronger protection for consumers in India. It establishes a three-tier quasi-judicial mechanism: District Consumer Disputes Redressal Forum, State Consumer Disputes Redressal Commission, and National Consumer Disputes Redressal Commission. The Act covers goods and services including e-commerce, introduces product liability, regulates misleading advertisements, and establishes the Central Consumer Protection Authority (CCPA). Complaints can be filed online through edaakhil.nic.in portal.',
    keySections: [
      { section: 'Section 2(7)', title: 'Definition of Consumer', description: 'Any person who buys goods or avails services for consideration. Includes online purchases and e-commerce transactions. Excludes persons who obtain goods for resale or commercial purpose.' },
      { section: 'Section 34-37', title: 'Consumer Disputes Redressal Commission', description: 'Three-tier structure: District (up to ₹1 Crore), State (₹1-10 Crore), National (above ₹10 Crore). Complaints can be filed where the consumer resides or where the business is located.' },
      { section: 'Section 82-87', title: 'Product Liability', description: 'Manufacturers, product sellers, and product service providers are liable for harm caused by defective products. Includes claims for manufacturing defect, design defect, and inadequate warnings or instructions.' },
      { section: 'Section 89', title: 'Misleading Advertisements', description: 'Prohibits false or misleading advertisements. CCPA can impose penalty up to ₹10 lakh on manufacturer and up to ₹50 lakh on endorser for subsequent offences. Endorsers can face ban from endorsing for up to 3 years.' },
      { section: 'Section 94-95', title: 'E-Commerce Consumer Protection', description: 'E-commerce entities must display information about goods/services, return/refund/exchange policy, grievance redressal mechanism, and country of origin. No-return policies on defective goods are not permitted.' }
    ],
    examples: [
      { title: 'Defective Product Return', scenario: 'A customer buys a mobile phone online that stops working after 3 days. The e-commerce site refuses return.', outcome: 'The consumer can file complaint on edaakhil.nic.in. Under Section 82, both the seller and e-commerce platform are liable. Consumer can claim refund, replacement, and compensation for harassment.' },
      { title: 'Hospital Overcharging', scenario: 'A hospital charges ₹5 lakh for a procedure that costs ₹1.5 lakh at other hospitals.', outcome: 'Under CPA 2019, medical services fall under consumer protection. Consumer can file complaint at District Forum seeking refund of excess amount and compensation. Hospitals must display rate cards.' },
      { title: 'Misleading Advertisement', scenario: 'A skin cream advertisement claims to make skin fair in 7 days, which is false.', outcome: 'CCPA can take action against both manufacturer and endorser. Penalty up to ₹10 lakh for first offence. Consumer affected can claim compensation in consumer forum.' }
    ],
    useCases: [
      { title: 'Online Shopping Disputes', description: 'File complaints against e-commerce platforms for defective products, non-delivery, wrong product delivery, or refund issues. File on edaakhil.nic.in or contact company\'s grievance officer first.' },
      { title: 'Banking and Insurance Complaints', description: 'Dispute unauthorized charges, insurance claim rejections, or mis-selling of financial products. Can approach banking ombudsman or consumer forum.' },
      { title: 'Real Estate Complaints', description: 'For builder delays, quality issues, or unfair terms. File with RERA Authority for registered projects or consumer forum. Can claim interest on delayed possession.' },
      { title: 'Food Safety Issues', description: 'Report food quality issues, adulteration, or hygiene violations. File with FSSAI or consumer forum for compensation.' }
    ],
    importantLinks: [
      { label: 'E-Daakhil Consumer Complaint Portal', url: 'https://edaakhil.nic.in/' },
      { label: 'National Consumer Helpline', url: 'https://consumerhelpline.gov.in/' },
      { label: 'CCPA Official', url: 'https://consumeraffairs.nic.in/ccpa' }
    ]
  },
  {
    slug: 'it-act',
    title: 'Information Technology Act, 2000',
    category: 'Cyber Law',
    icon: '💻',
    overview: 'The Information Technology Act 2000 (amended in 2008) is India\'s primary law for cybercrime and electronic commerce. It provides legal recognition to electronic transactions, digital signatures, and documents. The Act defines cybercrimes and prescribes penalties for offences like hacking, identity theft, cyber terrorism, publishing obscene material, and sending offensive messages. With increasing digitization, this Act has become crucial for protecting Indians from online fraud, data breaches, and cyber harassment. Complaints can be registered at cybercrime.gov.in.',
    keySections: [
      { section: 'Section 43', title: 'Penalty for Damage to Computer Systems', description: 'Anyone who accesses a computer without permission, downloads data, introduces viruses, or causes damage shall be liable to pay compensation up to ₹1 crore to the affected person.' },
      { section: 'Section 66', title: 'Computer Related Offences (Hacking)', description: 'Dishonestly or fraudulently performing any act under Section 43 is punishable with imprisonment up to 3 years and/or fine up to ₹5 lakh. Covers unauthorized access, data theft, and system manipulation.' },
      { section: 'Section 66C', title: 'Identity Theft', description: 'Fraudulently using electronic signature, password, or any unique identification feature of another person is punishable with imprisonment up to 3 years and fine up to ₹1 lakh.' },
      { section: 'Section 66E', title: 'Violation of Privacy', description: 'Intentionally capturing, publishing, or transmitting images of a private area of any person without consent is punishable with imprisonment up to 3 years and/or fine up to ₹2 lakh.' },
      { section: 'Section 67/67A/67B', title: 'Publishing Obscene Material Online', description: 'Publishing obscene material: up to 3 years + ₹5 lakh fine (first offence). Sexually explicit material: up to 5 years + ₹10 lakh fine. Child pornography: up to 5-7 years + ₹10 lakh fine.' },
      { section: 'Section 79', title: 'Intermediary Liability', description: 'Internet intermediaries (social media, e-commerce) are not liable for third-party content if they follow due diligence. Must remove content within 36 hours of government order.' }
    ],
    examples: [
      { title: 'UPI/Online Banking Fraud', scenario: 'Someone receives a call posing as bank staff and shares OTP, losing ₹50,000 from their account.', outcome: 'File complaint on cybercrime.gov.in and call 1930 within golden hour. Under RBI guidelines, if reported within 3 days, maximum liability is limited. FIR under Section 66C (identity theft) and 66D (cheating by personation).' },
      { title: 'Social Media Harassment', scenario: 'Someone creates a fake social media profile using another person\'s photos and sends abusive messages.', outcome: 'Section 66C applies for identity theft (3 years imprisonment). File complaint on cybercrime.gov.in, report to social media platform, and file FIR. Platform must remove content within 36 hours of order.' },
      { title: 'Data Breach / Leaked Photos', scenario: 'An ex-partner threats to share private photos online.', outcome: 'Section 66E (privacy violation: 3 years imprisonment). If images are shared: Section 67/67A applies (5 years). File immediate complaint on cybercrime.gov.in. Courts can order removal and award compensation.' }
    ],
    useCases: [
      { title: 'Reporting Cyber Crime', description: 'Report on cybercrime.gov.in or call 1930. Categories: financial fraud, women/child crimes, other cybercrimes. Keep evidence (screenshots, call logs, transaction IDs).' },
      { title: 'E-Commerce Disputes', description: 'IT Act provides framework for electronic contracts and digital signatures. Consumers can use electronic evidence in consumer disputes.' },
      { title: 'Business Data Protection', description: 'Section 43A requires companies handling sensitive personal data to implement reasonable security practices. Failure can lead to compensation claims.' },
      { title: 'Social Media Content Removal', description: 'Report illegal content to platform\'s grievance officer. Under IT Rules 2021, platforms must acknowledge within 24 hours and resolve within 15 days.' }
    ],
    importantLinks: [
      { label: 'National Cyber Crime Reporting Portal', url: 'https://cybercrime.gov.in/' },
      { label: 'Cyber Fraud Helpline (1930)', url: 'https://cybercrime.gov.in/' },
      { label: 'IT Act Full Text', url: 'https://www.indiacode.nic.in/handle/123456789/1362' }
    ]
  },
  {
    slug: 'labour-laws',
    title: 'Labour Laws in India',
    category: 'Employment Law',
    icon: '👷',
    overview: 'India has consolidated 29 central labour laws into 4 Labour Codes: Code on Wages (2019), Industrial Relations Code (2020), Social Security Code (2020), and Occupational Safety, Health and Working Conditions Code (2020). These codes cover minimum wages, industrial disputes, social security (PF, ESI, gratuity, maternity benefits), and workplace safety. Every worker in India has fundamental rights including minimum wages, safe working conditions, social security benefits, prevention of sexual harassment (POSH Act 2013), and protection against unfair termination.',
    keySections: [
      { section: 'Code on Wages, 2019', title: 'Minimum Wages & Payment', description: 'Applies to ALL establishments. Central floor wage set by government. Payment must be made before 7th of subsequent month. Equal remuneration for equal work regardless of gender. No wage deductions except as authorized.' },
      { section: 'Industrial Relations Code, 2020', title: 'Hire & Fire, Strikes, Unions', description: 'Establishments with 300+ workers need government permission for layoffs/retrenchment/closure. Workers get 15 days salary per year of service as retrenchment compensation. Right to form trade unions. Strike requires 14-day notice in all industries.' },
      { section: 'Social Security Code, 2020', title: 'PF, ESI, Gratuity, Maternity', description: 'EPF: 12% employee + 12% employer contribution on basic salary. ESI: medical benefits for employees earning up to ₹21,000/month. Gratuity: 15 days salary per year after 5 years of service. Maternity: 26 weeks paid leave.' },
      { section: 'POSH Act, 2013', title: 'Prevention of Sexual Harassment at Workplace', description: 'All workplaces with 10+ employees must constitute Internal Complaints Committee (ICC). Written complaint within 3 months. Inquiry completed within 90 days. Employer action within 60 days. Complainant cannot be penalized.' },
      { section: 'OSH Code, 2020', title: 'Occupational Safety & Working Conditions', description: 'Maximum 8 hours/day work, overtime at 2x wages. Annual health check-ups for hazardous industries. First-aid and welfare facilities mandatory. Women can work in all establishments including night shifts with safety provisions.' }
    ],
    examples: [
      { title: 'Unpaid Wages', scenario: 'An IT company has not paid salary for 3 months to a software developer.', outcome: 'Send written demand to employer. Complain to Labour Commissioner under Code on Wages. File claim in Labour Court. Employer can be fined up to ₹50,000 for first offence. Interest on delayed payment also applicable.' },
      { title: 'Workplace Harassment', scenario: 'A female employee faces sexual harassment from a senior manager.', outcome: 'File complaint with Internal Complaints Committee (ICC) within 3 months. If no ICC, approach Local Complaints Committee. Inquiry must complete within 90 days. Employer must act in 60 days. Complainant gets protection from retaliation.' },
      { title: 'Wrongful Termination', scenario: 'A factory worker with 10 years of service is terminated without notice.', outcome: 'Under Industrial Relations Code, workers with 1+ year service must get 1-month notice or pay in lieu. Plus retrenchment compensation of 15 days salary per year of service = 150 days salary. Can challenge in Labour Court.' }
    ],
    useCases: [
      { title: 'PF Withdrawal', description: 'Login to unifiedportal-mem.epfindia.gov.in. Full withdrawal after 2 months of unemployment. Partial withdrawal for housing, medical, marriage. Processing: 10-20 days if Aadhaar linked.' },
      { title: 'ESI Benefits', description: 'Medical treatment at ESI hospitals for employees earning up to ₹21,000/month. Sickness benefit: 70% of wages for 91 days. Maternity benefit: full wages for 26 weeks.' },
      { title: 'Filing Labour Complaint', description: 'Complain to District Labour Commissioner or file online on state labour department portal. No lawyer needed. Free of cost. Can claim back wages, compensation, and reinstatement.' },
      { title: 'Gratuity Claim', description: 'After 5 years of service, employee entitled to 15 days salary per year of service. File Form I to employer. If denied, complain to Controlling Authority under Payment of Gratuity Act.' }
    ],
    importantLinks: [
      { label: 'EPFO Unified Portal', url: 'https://unifiedportal-mem.epfindia.gov.in/' },
      { label: 'Ministry of Labour Portal', url: 'https://labour.gov.in/' },
      { label: 'ESIC Portal', url: 'https://www.esic.gov.in/' }
    ]
  },
  {
    slug: 'property-rent-laws',
    title: 'Property & Rent Laws',
    category: 'Property Law',
    icon: '🏠',
    overview: 'Property law in India is governed by the Transfer of Property Act 1882, Registration Act 1908, Indian Stamp Act 1899, Real Estate (Regulation and Development) Act 2016 (RERA), and state-specific Rent Control Acts. The Model Tenancy Act 2021 provides a framework for tenant-landlord relationships. RERA protects homebuyers from builder delays and fraud. Property transactions require registration at the Sub-Registrar office and payment of stamp duty (4-8% depending on state). Land records can be verified through state Bhulekh/Bhoomi portals.',
    keySections: [
      { section: 'RERA 2016', title: 'Real Estate Regulation & Development', description: 'All real estate projects with land area > 500 sq.m or 8+ apartments must register with state RERA authority. Builders must maintain 70% of collected amount in escrow. Buyers can claim refund with interest for delayed possession. Builders penalized up to 5% of project cost for violations.' },
      { section: 'Transfer of Property Act, 1882', title: 'Property Transfer Rules', description: 'Governs transfer of property by sale, mortgage, lease, exchange, and gift. Sale deed must be in writing and registered. Transfer is complete only upon registration with Sub-Registrar. Unregistered sale deeds have no legal validity for immovable property above ₹100.' },
      { section: 'Model Tenancy Act, 2021', title: 'Tenant-Landlord Framework', description: 'Rent agreement mandatory in writing. Security deposit limited to 2 months rent for residential. Landlord must give 3-month notice for eviction. Tenant must give 1-month notice for vacating. Rent authority to resolve disputes within 60 days.' },
      { section: 'Indian Stamp Act, 1899', title: 'Stamp Duty on Property', description: 'All property transactions require stamp duty payment: typically 4-8% of property value (varies by state). Women often get 1-2% concession. E-stamping available in most states. Non-payment of stamp duty renders document inadmissible in court.' },
      { section: 'Registration Act, 1908', title: 'Property Registration', description: 'All property documents (sale deed, gift deed, mortgage deed, lease > 1 year) must be registered at Sub-Registrar office within 4 months of execution. Registration fee typically 1% of property value. Both parties must appear with 2 witnesses.' }
    ],
    examples: [
      { title: 'Builder Delay', scenario: 'A builder promised flat possession in 2023 but has not delivered yet. The buyer has been paying EMI.', outcome: 'File complaint on state RERA portal. Under RERA, builder must pay interest at SBI prime lending rate + 2% for every month of delay. Buyer can opt for refund with interest from date of each payment. Builder can face penalty up to 5% of project cost.' },
      { title: 'Landlord Refusing Deposit Return', scenario: 'After vacating rented premises, landlord refuses to return ₹1,00,000 security deposit.', outcome: 'Send legal notice demanding refund within 30 days. If no response, file case in Rent Control tribunal or Small Causes Court. Under Model Tenancy Act, landlord must refund deposit within 1 month of vacancy after deducting only legitimate documented damages.' },
      { title: 'Land Dispute', scenario: 'Two parties claim ownership of the same plot of land.', outcome: 'Verify ownership through revenue records (7/12 extract or khata certificate). Check encumbrance certificate for any loans/claims. If disputed, file civil suit for declaration of title and injunction in district court.' }
    ],
    useCases: [
      { title: 'Buying Property - Due Diligence', description: 'Check title deed chain for 30+ years. Verify encumbrance certificate. Check RERA registration for new projects. Verify building plan approval. Search for pending litigation in district court records. Get legal opinion from advocate.' },
      { title: 'Rent Agreement Creation', description: 'Draft written rent agreement. Include: parties, property details, rent amount, security deposit, duration, maintenance responsibility, notice period. Get it registered if duration > 11 months. Keep original with each party.' },
      { title: 'Filing RERA Complaint', description: 'Register on state RERA portal (e.g., maharera.mahaonline.gov.in). Upload allotment letter, payment receipts, builder communications. Pay ₹1,000 complaint fee. Track adjudication online.' },
      { title: 'Property Mutation After Death', description: 'Apply at local municipal/revenue office with: death certificate, legal heir certificate, original property documents. If will exists, apply for probate. If no will, apply for succession certificate in civil court.' }
    ],
    importantLinks: [
      { label: 'RERA - MahaRERA (Maharashtra)', url: 'https://maharera.mahaonline.gov.in/' },
      { label: 'UP Bhulekh (Land Records)', url: 'https://upbhulekh.gov.in/' },
      { label: 'Karnataka Bhoomi', url: 'https://landrecords.karnataka.gov.in/' }
    ]
  }
];

const procedures = [
  {
    slug: 'fir-filing',
    title: 'FIR Filing',
    icon: '🚨',
    purpose: 'An FIR (First Information Report) is a written document prepared by police when they receive information about a cognizable offence. It is the first step in the criminal justice process. Under Section 173 BNSS (Bharatiya Nagarik Suraksha Sanhita), police are legally bound to register an FIR for cognizable offences. The FIR sets the criminal law in motion and is a crucial document for investigation and prosecution.',
    requiredDocuments: [
      'Government-issued ID proof (Aadhaar, Voter ID, Passport, Driving License)',
      'Written complaint describing the incident in detail',
      'Any evidence of the offence (photos, videos, screenshots, medical reports)',
      'Details of the accused (if known) - name, address, description',
      'Details of witnesses (if any) - name, contact information',
      'Medical certificate (in case of physical injury or assault)'
    ],
    steps: [
      { stepNumber: 1, title: 'Visit the Nearest Police Station', description: 'Go to the police station that has jurisdiction over the area where the incident occurred. However, under Zero FIR provisions, you can file at ANY police station and it will be transferred to the concerned station later.' },
      { stepNumber: 2, title: 'Meet the Station House Officer (SHO)', description: 'Ask to meet the SHO or officer on duty. Clearly state that you want to file an FIR for a cognizable offence. You can also give a written complaint.' },
      { stepNumber: 3, title: 'Narrate the Incident', description: 'Describe the incident clearly with date, time, place, description of offence, details of accused and witnesses. The officer will write it down or type it. You can dictate in your own language.' },
      { stepNumber: 4, title: 'Read and Sign the FIR', description: 'Read the FIR carefully before signing. Ensure all facts are correctly recorded. You can request corrections. You have the right to have someone read it for you. Keep a copy.' },
      { stepNumber: 5, title: 'Get the FIR Copy', description: 'Under law, police MUST give you a free copy of the FIR. Note down the FIR number, date, and the investigating officer\'s name and contact. This is your reference for all follow-ups.' },
      { stepNumber: 6, title: 'Follow Up', description: 'Follow up within 72 hours. You can check investigation status. If unsatisfied with investigation, approach the SP/SSP or Judicial Magistrate under Section 175(3) BNSS.' }
    ],
    fees: 'Free – No charges for filing an FIR',
    timeline: 'FIR must be registered immediately for cognizable offences. There is no time limit. Investigation should commence within 24 hours.',
    officialLink: 'https://digitalpolice.gov.in/',
    tips: [
      'If police refuse to register FIR, send written complaint to SP/SSP by registered post',
      'You can file FIR online through your state police website',
      'Zero FIR can be filed at any police station regardless of jurisdiction',
      'For cyber crimes, file on cybercrime.gov.in or call 1930',
      'Keep multiple copies of the FIR for your records',
      'You can approach Judicial Magistrate under Section 175(3) BNSS if police refuse FIR'
    ]
  },
  {
    slug: 'rti-application',
    title: 'RTI Application',
    icon: '📝',
    purpose: 'The Right to Information Act, 2005 empowers Indian citizens to request information from any public authority. RTI is a powerful tool for transparency and accountability. Any citizen can seek information about government decisions, expenditures, policies, and actions. The government must respond within 30 days. RTI has been instrumental in exposing corruption, improving governance, and ensuring citizen participation in democracy.',
    requiredDocuments: [
      'Written application addressed to the Public Information Officer (PIO)',
      'Application fee of ₹10 (by cash, DD, or IPO)',
      'Specific and clear questions (avoid vague queries)',
      'Your name and complete postal address',
      'BPL card (if seeking fee exemption)'
    ],
    steps: [
      { stepNumber: 1, title: 'Identify the Public Authority', description: 'Determine which government department holds the information you seek. Each ministry, department, PSU, and local body has designated PIOs.' },
      { stepNumber: 2, title: 'Draft Your RTI Application', description: 'Write "Application under RTI Act 2005" at the top. Address it to the PIO. Write specific, clear questions. Avoid opinions or seeking reasons for decisions. Ask for documents, data, and records.' },
      { stepNumber: 3, title: 'Pay the Application Fee', description: 'Fee is ₹10 for central government. State governments may have different fees. BPL families are exempt. Pay by cash, demand draft, Indian postal order, or online.' },
      { stepNumber: 4, title: 'Submit the Application', description: 'Online: Submit at rtionline.gov.in for central government departments. Offline: Submit in person or send by registered post to the PIO of concerned department.' },
      { stepNumber: 5, title: 'Track Response (30-Day Deadline)', description: 'PIO must reply within 30 days (48 hours for life/liberty matters). If information concerns another department, PIO transfers within 5 days. Additional fee may be required for documents.' },
      { stepNumber: 6, title: 'File Appeal if No Response', description: 'First Appeal: To Appellate Authority within 30 days of deadline. Second Appeal: To Central/State Information Commission within 90 days. PIO can be penalized ₹250/day for delay.' }
    ],
    fees: '₹10 per application (Central Government). Varies by state. BPL families exempt. Additional fee for photocopies (₹2/page).',
    timeline: '30 days for response. 48 hours for life/liberty matters. Transfer to other department: 5 days. First Appeal response: 30 days. Second Appeal: 90 days.',
    officialLink: 'https://rtionline.gov.in/',
    tips: [
      'Ask specific questions – avoid "why" type questions',
      'You don\'t need to give reason for seeking information',
      'Keep questions focused on one department per application',
      'If PIO doesn\'t respond, file First Appeal immediately after 30 days',
      'Keep copies of application and postal receipt',
      'RTI can be filed in Hindi, English, or official language of the state'
    ]
  },
  {
    slug: 'consumer-complaint',
    title: 'Consumer Complaint',
    icon: '🛡️',
    purpose: 'Filing a consumer complaint is a legal process to seek redressal against unfair trade practices, defective goods, deficient services, overcharging, or misleading advertisements. Under the Consumer Protection Act 2019, consumers can file complaints through the e-Daakhil portal (edaakhil.nic.in) without needing a lawyer. The three-tier consumer disputes redressal mechanism provides quick and affordable justice.',
    requiredDocuments: [
      'Identity proof (Aadhaar, PAN, Voter ID)',
      'Purchase receipt, bill, or invoice',
      'Product warranty card (if applicable)',
      'Written complaint with details of deficiency/defect',
      'Communication with seller/company (emails, chat screenshots)',
      'Medical reports (if health was affected)',
      'Bank statements or payment proof',
      'Photos/videos of defective product (if applicable)'
    ],
    steps: [
      { stepNumber: 1, title: 'Attempt Resolution with Seller First', description: 'Send a written complaint to the company/seller through email or registered post. Give them 15-30 days to resolve. Keep copies of all communication as evidence for consumer forum.' },
      { stepNumber: 2, title: 'Send Legal Notice (Optional but Recommended)', description: 'Send a legal notice through registered AD post demanding resolution within 30 days. This shows your seriousness and is strong evidence in court. Can be drafted without lawyer.' },
      { stepNumber: 3, title: 'Register on e-Daakhil Portal', description: 'Visit edaakhil.nic.in and create an account with mobile/email. No charges for registration. Portal available in multiple languages.' },
      { stepNumber: 4, title: 'File the Complaint Online', description: 'Fill complaint form with your details, opposite party details, facts of the case, relief claimed. Upload all evidence/documents. Select appropriate forum based on claim amount.' },
      { stepNumber: 5, title: 'Pay Court Fee', description: 'Court fee is NIL for claims up to ₹5 lakh. For claims ₹5L-10L: ₹200. For ₹10L-20L: ₹400. Up to ₹50L: ₹1,000. Up to ₹1Cr: ₹2,000. Pay online through portal.' },
      { stepNumber: 6, title: 'Attend Hearings', description: 'Notice is sent to opposite party within 21 days. You can attend in person or through video conference. No lawyer required. Present your evidence and arguments. Decision typically within 3-5 months.' }
    ],
    fees: 'Free for claims up to ₹5 lakh. ₹200 to ₹5,000 based on claim amount. No lawyer fees required.',
    timeline: 'Notice to opposite party: 21 days. Final order: 3-5 months typically. Appeal in 30 days to higher commission.',
    officialLink: 'https://edaakhil.nic.in/',
    tips: [
      'No lawyer needed – consumer forums are designed for self-representation',
      'File complaint within 2 years of the issue',
      'Keep all original documents safe – submit photocopies as evidence',
      'You can claim compensation for mental agony and litigation costs',
      'Video conference option available for hearings',
      'File where you reside, not where the seller is located'
    ]
  },
  {
    slug: 'marriage-registration',
    title: 'Marriage Registration',
    icon: '💍',
    purpose: 'Marriage registration provides legal recognition to a marriage and serves as conclusive proof. It is essential for passport applications, visa processing, opening joint bank accounts, insurance claims, property rights, and legal proceedings. Marriage can be registered under the respective personal law (Hindu Marriage Act, Muslim Personal Law, etc.) or under the Special Marriage Act 1954 (for inter-faith/civil marriages). Most states have made marriage registration compulsory.',
    requiredDocuments: [
      'Application form (available at Sub-Registrar office or online)',
      'Age proof of both parties (birth certificate, passport, school certificate)',
      'Address proof of both parties (Aadhaar, Voter ID, utility bills)',
      'Passport-size photographs of bride and groom (4-6 each)',
      'Marriage invitation card or ceremony photographs',
      'Affidavit of marriage on non-judicial stamp paper',
      'Two witnesses with valid ID proof',
      'Fee payment receipt',
      'Divorce decree (if previously married)',
      'Death certificate of former spouse (if applicable)'
    ],
    steps: [
      { stepNumber: 1, title: 'Collect Required Documents', description: 'Gather all documents listed above. Get an affidavit of marriage signed on ₹10 non-judicial stamp paper by both parties. Have witnesses ready with their ID proofs.' },
      { stepNumber: 2, title: 'Apply at Sub-Registrar Office', description: 'Visit the Sub-Registrar office of the area where either party resides or where the marriage was solemnized. Some states allow online application through e-district portals.' },
      { stepNumber: 3, title: 'For Special Marriage Act: 30-Day Notice', description: 'If registering under Special Marriage Act, a 30-day notice is published for objections. Both parties must be present when giving notice. Note: This applies only to Special Marriage Act, not personal law registrations.' },
      { stepNumber: 4, title: 'Both Parties + Witnesses Appear', description: 'On the appointed date, both bride, groom, and two witnesses must appear before the Sub-Registrar with original documents. Identity verification takes place.' },
      { stepNumber: 5, title: 'Sign the Marriage Register', description: 'Both parties and witnesses sign the marriage register. Sub-Registrar verifies documents and issues the marriage certificate on the same day or within 7-15 days depending on the state.' },
      { stepNumber: 6, title: 'Collect Marriage Certificate', description: 'Marriage certificate is issued with a unique registration number. Get multiple certified copies. This document is valid for all legal purposes including passport, visa, and property matters.' }
    ],
    fees: '₹100-500 (varies by state). Stamp paper for affidavit: ₹10-100.',
    timeline: 'Personal law registration: 1-7 days. Special Marriage Act: 30 days (notice period) + 7 days. Certificate issued same day or within 15 days after registration.',
    officialLink: 'https://www.india.gov.in/topics/law-justice/marriage',
    tips: [
      'Register marriage as soon as possible after the ceremony',
      'Both parties must be present in person',
      'Some states have online appointment system – check before visiting',
      'Marriage certificate is essential for passport, visa, and property matters',
      'Keep multiple certified copies of the marriage certificate',
      'Under Special Marriage Act, there is no requirement of religious ceremony'
    ]
  },
  {
    slug: 'passport-application',
    title: 'Passport Application',
    icon: '🛂',
    purpose: 'An Indian passport is a travel document issued by the Ministry of External Affairs. It serves as proof of Indian citizenship and identity. There are three types: Ordinary (blue), Official (white), and Diplomatic (maroon). The application process is fully online through the Passport Seva portal. Passport is essential for international travel, and also serves as a valid identity and address proof within India.',
    requiredDocuments: [
      'Proof of Identity: Aadhaar card, Voter ID, PAN card, or Driving License',
      'Proof of Address: Aadhaar card, utility bills, bank statement, or rent agreement',
      'Proof of Date of Birth: Birth certificate, school leaving certificate, or Aadhaar',
      'Passport-size photographs (as per specifications: white background, no glasses)',
      'Old passport (for renewal)',
      'Marriage certificate (if applicable, for name change)',
      'Non-ECR (Emigration Check Required) category proof: Class 10 or equivalent certificate'
    ],
    steps: [
      { stepNumber: 1, title: 'Register on Passport Seva Portal', description: 'Visit passportindia.gov.in and create an account with email ID. Fill the registration form with your details. Login credentials will be sent to your email.' },
      { stepNumber: 2, title: 'Fill Online Application Form', description: 'Login and fill the passport application form. Choose between fresh passport or re-issue. Fill personal details, family information, present/permanent address. Select normal or tatkal (urgent) category.' },
      { stepNumber: 3, title: 'Pay the Fee Online', description: 'Normal (36 pages): ₹1,500. Jumbo (60 pages): ₹2,000. Tatkal (36 pages): ₹3,500. Tatkal (60 pages): ₹4,000. Pay through net banking, credit/debit card, or SBI challan.' },
      { stepNumber: 4, title: 'Book Appointment at PSK/POPSK', description: 'Schedule appointment at nearest Passport Seva Kendra (PSK) or Post Office Passport Seva Kendra (POPSK). Choose convenient date and time. Print the appointment slip.' },
      { stepNumber: 5, title: 'Visit PSK with Documents', description: 'Reach PSK/POPSK at appointed time with original documents and application receipt. Process includes: token, form verification, biometrics capture, photo, and document verification. Takes 2-3 hours.' },
      { stepNumber: 6, title: 'Police Verification & Dispatch', description: 'Police verification may happen before or after passport issuance. Passport dispatched via Speed Post. Track status on passportindia.gov.in. Normal processing: 30-45 days. Tatkal: 1-3 working days.' }
    ],
    fees: 'Normal: ₹1,500 (36 pages) / ₹2,000 (60 pages). Tatkal: ₹3,500 / ₹4,000. Minor passport: ₹1,000.',
    timeline: 'Normal: 30-45 days. Tatkal: 1-3 working days after PSK visit. Police verification: 7-14 days additional. Passport validity: 10 years (adults), 5 years (minors).',
    officialLink: 'https://www.passportindia.gov.in/',
    tips: [
      'Apply online only – walk-in applications are not accepted',
      'Ensure Aadhaar address matches application address',
      'For tatkal, additional proof of urgency may be required',
      'Reach PSK at least 15 minutes before appointment',
      'Keep original documents and self-attested photocopies ready',
      'Track application status using file number on passportindia.gov.in'
    ]
  }
];

const schemes = [
  {
    name: 'Ayushman Bharat - PMJAY',
    slug: 'ayushman-bharat-pmjay',
    category: 'Health',
    eligibility: 'Bottom 40% of population as per SECC data, BPL families, auto/rickshaw drivers, street vendors, construction workers',
    benefits: '₹5 lakh per family per year for secondary and tertiary care hospitalization. Covers 1,929 procedures including surgery, day care, and pre/post hospitalization expenses.',
    requiredDocuments: ['Aadhaar Card', 'Ration Card', 'SECC Family ID', 'Mobile Number'],
    officialWebsite: 'https://pmjay.gov.in',
    description: 'World\'s largest health assurance scheme covering over 55 crore beneficiaries. Provides cashless treatment at 27,000+ empanelled hospitals across India.'
  },
  {
    name: 'PM Awas Yojana (PMAY)',
    slug: 'pm-awas-yojana',
    category: 'Housing',
    eligibility: 'EWS (income < ₹3L/year), LIG (₹3-6L), MIG-I (₹6-12L), MIG-II (₹12-18L). Must not own a pucca house anywhere in India.',
    benefits: 'Subsidy up to ₹2.67 lakh on home loan interest. EWS gets ₹1.5 lakh, LIG ₹1.5 lakh, MIG-I ₹2.35 lakh, MIG-II ₹2.30 lakh.',
    requiredDocuments: ['Aadhaar Card', 'Income Certificate', 'Property Documents', 'Bank Account Details', 'Caste Certificate (if applicable)'],
    officialWebsite: 'https://pmaymis.gov.in',
    description: 'Housing for All scheme providing affordable housing to urban and rural poor through credit-linked subsidy and direct benefit transfer.'
  },
  {
    name: 'PM Kisan Samman Nidhi',
    slug: 'pm-kisan-samman-nidhi',
    category: 'Agriculture',
    eligibility: 'All landholding farmer families with cultivable land holding. Excludes institutional landholders, income tax payers, and government servants.',
    benefits: '₹6,000 per year in three equal installments of ₹2,000 each, directly transferred to bank account.',
    requiredDocuments: ['Aadhaar Card', 'Bank Account with IFSC', 'Land Records/Khasra Khatauni', 'Mobile Number'],
    officialWebsite: 'https://pmkisan.gov.in',
    description: 'Direct income support to small and marginal farmers to supplement financial needs for crop health and appropriate harvest.'
  },
  {
    name: 'Stand-Up India',
    slug: 'stand-up-india',
    category: 'Business',
    eligibility: 'SC/ST and/or Women entrepreneurs. Age 18+ years. Loans for greenfield (new) enterprises only. Not a defaulter to any bank.',
    benefits: 'Composite loan between ₹10 lakh and ₹1 crore for setting up a new enterprise in manufacturing, services, or trading sector.',
    requiredDocuments: ['Identity Proof', 'Address Proof', 'Caste Certificate (for SC/ST)', 'Business Plan', 'Project Report', 'Quotations for Machinery'],
    officialWebsite: 'https://www.standupmitra.in',
    description: 'Facilitates bank loans to at least one SC/ST borrower and one woman borrower per bank branch for setting up greenfield enterprises.'
  },
  {
    name: 'NALSA Free Legal Aid',
    slug: 'nalsa-free-legal-aid',
    category: 'Legal',
    eligibility: 'SC/ST persons, women, children, persons with disabilities, industrial workmen, victims of mass disaster, persons in custody, persons with annual income below ₹3 lakh (varies by state)',
    benefits: 'Free lawyer for legal proceedings, court fees waived, legal counseling and advice, lok adalat access, mediation services.',
    requiredDocuments: ['Identity Proof', 'Income Certificate', 'Caste Certificate (if applicable)', 'Disability Certificate (if applicable)'],
    officialWebsite: 'https://nalsa.gov.in',
    description: 'National Legal Services Authority provides free legal aid and access to justice for marginalized sections of society as mandated by Article 39A of the Constitution.'
  },
  {
    name: 'PM Fasal Bima Yojana',
    slug: 'pm-fasal-bima-yojana',
    category: 'Insurance',
    eligibility: 'All farmers growing notified crops in notified areas. Both loanee and non-loanee farmers. Sharecroppers and tenant farmers also eligible.',
    benefits: 'Crop insurance at low premium: 2% for Kharif, 1.5% for Rabi, 5% for commercial and horticultural crops. Full claim settlement for crop loss.',
    requiredDocuments: ['Aadhaar Card', 'Land Records', 'Sowing Certificate', 'Bank Account Details', 'Declaration Form'],
    officialWebsite: 'https://pmfby.gov.in',
    description: 'Comprehensive crop insurance scheme providing financial support to farmers suffering crop loss due to natural calamities, pests, and diseases.'
  },
  {
    name: 'Sukanya Samriddhi Yojana',
    slug: 'sukanya-samriddhi-yojana',
    category: 'Savings',
    eligibility: 'Girl child below 10 years of age. Maximum 2 accounts per family. Account in the name of girl child opened by parent/guardian.',
    benefits: 'Interest rate 8.2% per annum (tax-free under 80C). Minimum deposit ₹250/year, maximum ₹1.5 lakh/year. Maturity after 21 years or marriage after 18.',
    requiredDocuments: ['Girl Child Birth Certificate', 'Parent/Guardian ID Proof', 'Parent/Guardian Address Proof', 'Passport Photos'],
    officialWebsite: 'https://www.india.gov.in/sukanya-samriddhi-yojna',
    description: 'Government-backed savings scheme for the girl child with one of the highest interest rates and complete tax benefits under Section 80C.'
  },
  {
    name: 'PM Mudra Yojana',
    slug: 'pm-mudra-yojana',
    category: 'Business',
    eligibility: 'Any Indian citizen with a non-farm business plan for income generation in manufacturing, trading, or services. No collateral required.',
    benefits: 'Shishu: loans up to ₹50,000. Kishore: ₹50,000 to ₹5 lakh. Tarun: ₹5 lakh to ₹10 lakh. No processing fee. Loans available through all banks.',
    requiredDocuments: ['Identity Proof', 'Address Proof', 'Business Plan', 'Quotations', 'Passport Photos', 'Category Certificate (if applicable)'],
    officialWebsite: 'https://www.mudra.org.in',
    description: 'Micro Units Development and Refinance Agency provides loans to micro and small enterprises for income generation and employment creation.'
  },
  {
    name: 'Digital India',
    slug: 'digital-india',
    category: 'Technology',
    eligibility: 'All Indian citizens, organizations, and enterprises. Various sub-schemes have specific eligibility criteria.',
    benefits: 'Digital literacy training, broadband connectivity, e-governance services, IT-based jobs, digital payment incentives, and BPO/IT infrastructure in small cities.',
    requiredDocuments: ['Aadhaar Card', 'Mobile Number', 'Bank Account (for digital payment benefits)'],
    officialWebsite: 'https://digitalindia.gov.in',
    description: 'Transforming India into a digitally empowered society with focus on digital infrastructure, digital literacy, and digital delivery of services.'
  },
  {
    name: 'Beti Bachao Beti Padhao',
    slug: 'beti-bachao-beti-padhao',
    category: 'Women & Child',
    eligibility: 'All girl children. Focus on districts with low child sex ratio. Primary focus on awareness campaigns and institutional capacity building.',
    benefits: 'Improved child sex ratio, education support for girls, awareness campaigns, institutional delivery, and women empowerment activities.',
    requiredDocuments: ['Birth Certificate', 'School Enrollment Proof', 'Family Details'],
    officialWebsite: 'https://wcd.nic.in/bbbp-schemes',
    description: 'Nationwide campaign to address the declining child sex ratio, ensure survival, protection, and education of the girl child.'
  },
  {
    name: 'PM Vishwakarma',
    slug: 'pm-vishwakarma',
    category: 'Artisans',
    eligibility: 'Traditional artisans and craftspeople working with hands and tools in 18 identified trades including carpentry, blacksmithing, goldsmithing, pottery, tailoring.',
    benefits: '₹3 lakh collateral-free loan at 5% interest. Free skill training with ₹500/day stipend. Modern toolkit. Digital marketing support. Brand promotion.',
    requiredDocuments: ['Aadhaar Card', 'Bank Account', 'Mobile Number', 'Proof of Traditional Craft Work', 'Self-Declaration'],
    officialWebsite: 'https://pmvishwakarma.gov.in',
    description: 'Central sector scheme supporting traditional artisans and craftspeople through access to credit, skill training, modern tools, and market linkage.'
  },
  {
    name: 'Atal Pension Yojana',
    slug: 'atal-pension-yojana',
    category: 'Pension',
    eligibility: 'Indian citizens aged 18-40 years. Must have a savings bank account. Not covered by any statutory social security scheme. Not an income tax payer.',
    benefits: 'Guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60. Government co-contribution of 50% for eligible accounts. Nominee gets lump sum.',
    requiredDocuments: ['Aadhaar Card', 'Savings Bank Account', 'Mobile Number', 'Nominee Details'],
    officialWebsite: 'https://www.npscra.nsdl.co.in/',
    description: 'Pension scheme for unorganized sector workers providing old age income security with guaranteed minimum pension.'
  },
  {
    name: 'PM Ujjwala Yojana',
    slug: 'pm-ujjwala-yojana',
    category: 'Energy',
    eligibility: 'Adult woman from identified BPL/poor households. No existing LPG connection in the household. Priority to SC/ST, Pradhan Mantri Awas Yojana beneficiaries, and forest dwellers.',
    benefits: 'Free LPG connection with deposit-free cylinder. EMI facility for stove and first refill. Financial subsidy on subsequent refills.',
    requiredDocuments: ['Aadhaar Card', 'BPL/Ration Card', 'Bank Account', 'Passport Photo', 'Address Proof'],
    officialWebsite: 'https://www.pmuy.gov.in',
    description: 'Providing clean cooking fuel (LPG) connections to BPL households, especially rural women, to reduce indoor air pollution and health hazards.'
  },
  {
    name: 'Startup India',
    slug: 'startup-india',
    category: 'Business',
    eligibility: 'DPIIT recognized startups. Company/LLP/Partnership incorporated for less than 10 years. Annual turnover less than ₹100 crore. Working towards innovation/improvement.',
    benefits: 'Tax exemption for 3 consecutive years. Self-certification under 6 labour and 3 environmental laws. Fast-track patent filing. ₹10K patent fee reduction. Access to Fund of Funds.',
    requiredDocuments: ['Certificate of Incorporation', 'Business Plan', 'Recommendation Letter (if applying through incubator)', 'Patent Details (if any)'],
    officialWebsite: 'https://www.startupindia.gov.in',
    description: 'Government initiative to promote startups through tax benefits, simplified compliance, funding support, and industry-academia partnerships.'
  },
  {
    name: 'PM SVANidhi',
    slug: 'pm-svanidhi',
    category: 'Business',
    eligibility: 'Street vendors in urban areas who have been vending on or before March 24, 2020. Must have a vending certificate/ID from ULB or recommendation letter.',
    benefits: 'Working capital loan: First cycle ₹10,000, second ₹20,000, third ₹50,000. Interest subsidy of 7%. Cash-back incentive for digital transactions.',
    requiredDocuments: ['Aadhaar Card', 'Vending Certificate/ID', 'Bank Account', 'Mobile Number', 'Passport Photo'],
    officialWebsite: 'https://pmsvanidhi.mohua.gov.in',
    description: 'Special micro-credit facility for street vendors affected by COVID-19 to resume their livelihoods with affordable working capital loans.'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Law.deleteMany({});
    await Procedure.deleteMany({});
    await Scheme.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert seed data
    await Law.insertMany(laws);
    console.log(`📚 Inserted ${laws.length} laws`);

    await Procedure.insertMany(procedures);
    console.log(`📋 Inserted ${procedures.length} procedures`);

    await Scheme.insertMany(schemes);
    console.log(`🏛️ Inserted ${schemes.length} schemes`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
