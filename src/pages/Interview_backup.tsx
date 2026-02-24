"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Interview;
var react_1 = require("react");
var industries = [
    { id: 'it', label: '💻 IT & Software', roles: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Cloud Engineer', 'Cybersecurity Analyst'] },
    { id: 'data', label: '📊 Data Science & AI', roles: ['Data Scientist', 'Data Analyst', 'Machine Learning Engineer', 'AI Engineer', 'Data Engineer'] },
    { id: 'product', label: '📦 Product & Design', roles: ['Product Manager', 'UX Designer', 'Project Manager', 'Scrum Master'] },
    { id: 'business', label: '💼 Business & Finance', roles: ['Business Analyst', 'Financial Analyst', 'Accountant', 'Marketing Manager', 'Sales Representative'] },
    { id: 'healthcare', label: '🏥 Healthcare', roles: ['Nurse', 'Physical Therapist', 'Pharmacist', 'Healthcare Administrator'] },
    { id: 'government', label: '🏛️ Government & Public', roles: ['Public Administrator', 'Policy Analyst', 'Government Relations', 'Civil Servant'] },
    { id: 'education', label: '📚 Education', roles: ['Teacher', 'Professor', 'Instructional Designer', 'Education Administrator'] },
    { id: 'creative', label: '🎨 Creative & Media', roles: ['Graphic Designer', 'Content Writer', 'Video Editor', 'Social Media Manager', 'SEO Specialist'] },
];
var interviewModes = [
    { id: 'technical', label: '💻 Technical', description: 'Coding, problem-solving, technical knowledge' },
    { id: 'behavioral', label: '🎭 Behavioral', description: 'STAR method questions, past experiences' },
    { id: 'situational', label: '🎯 Situational', description: 'Hypothetical scenarios, decision-making' },
    { id: 'hr', label: '👥 HR / Cultural Fit', description: 'Company values, teamwork, communication' },
];
// Skills to extract from resume for personalized questions
var skillKeywords = {
    programming: ['javascript', 'python', 'java', 'react', 'node', 'typescript', 'html', 'css', 'sql', 'ruby', 'go', 'rust'],
    data: ['analytics', 'visualization', 'machine learning', 'statistics', 'excel', 'tableau', 'pandas', 'numpy', 'tensorflow'],
    management: ['agile', 'scrum', 'project management', 'leadership', 'team management', 'stakeholder'],
    communication: ['presentation', 'public speaking', 'writing', 'documentation', 'client communication'],
    design: ['figma', 'sketch', 'adobe', 'ui', 'ux', 'prototyping', 'user research'],
    cloud: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'devops'],
    soft: ['leadership', 'teamwork', 'problem solving', 'critical thinking', 'adaptability', 'time management'],
};
// Generate personalized questions based on resume content
var generateResumeQuestions = function (resume, jobRole) {
    var resumeLower = resume.toLowerCase();
    var questions = [];
    // Extract skills from resume
    var foundSkills = [];
    for (var _i = 0, _a = Object.values(skillKeywords); _i < _a.length; _i++) {
        var skills = _a[_i];
        for (var _b = 0, skills_1 = skills; _b < skills_1.length; _b++) {
            var skill = skills_1[_b];
            if (resumeLower.includes(skill)) {
                foundSkills.push(skill);
            }
        }
    }
    // Generate questions based on found skills
    if (foundSkills.length > 0) {
        questions.push("Tell me about your experience with ".concat(foundSkills.slice(0, 3).join(', '), ". How have you applied these skills in your work?"));
        questions.push("Describe a project where you used ".concat(foundSkills[0] || 'your technical skills', ". What was the outcome?"));
    }
    // Generate follow-up questions based on job role
    if (jobRole.toLowerCase().includes('software') || jobRole.toLowerCase().includes('developer')) {
        questions.push('Walk me through your approach to solving a complex coding problem.');
        questions.push('How do you ensure your code is maintainable and follows best practices?');
    }
    else if (jobRole.toLowerCase().includes('data')) {
        questions.push('How do you approach analyzing a large dataset? Walk me through your process.');
        questions.push('Describe a time when your data analysis led to a business decision.');
    }
    else if (jobRole.toLowerCase().includes('manager')) {
        questions.push('Describe your leadership style and how you motivate your team.');
        questions.push('How do you handle conflicts within your team?');
    }
    // Add questions about achievements
    if (resumeLower.includes('achieved') || resumeLower.includes('increased') || resumeLower.includes('reduced')) {
        questions.push('You mentioned achievements in your resume. Can you tell me more about a specific accomplishment you are proud of?');
    }
    // Add questions about challenges overcome
    if (resumeLower.includes('challenge') || resumeLower.includes('difficult') || resumeLower.includes('obstacle')) {
        questions.push('Describe a significant challenge you faced and how you overcame it.');
    }
    return questions;
};
// Emotion detection patterns
var emotionPatterns = {
    enthusiastic: { pattern: /excited|passionate|love|thrilled|great|fantastic|amazing|wonderful/i, emoji: '😊' },
    reflective: { pattern: /think|believe|feel|perhaps|might|maybe|i consider/i, emoji: '🤔' },
    confident: { pattern: /certain|sure|definitely|absolutely|confident|guarantee/i, emoji: '💪' },
    humble: { pattern: /tried|learned| grew|developed|worked on|improving/i, emoji: '🌱' },
    determined: { pattern: /will|going to|determined|committed|focused|driven/i, emoji: '🎯' },
    empathetic: { pattern: /helped|supported|understood|cared|listened|collaborated/i, emoji: '🤝' },
};
// Empathetic response templates
var empatheticOpeners = [
    "I appreciate you sharing that - it shows real self-awareness.",
    "Thank you for being open about that experience.",
    "That's a thoughtful response - taking time to reflect is a real strength.",
    "I hear you, and that's a very honest answer.",
    "Your willingness to share that speaks to your character.",
];
var empatheticClosers = [
    "Remember, every interview is practice for the next one.",
    "You're building skills that will serve you well.",
    "This is exactly the kind of practice that leads to success.",
    "Your effort right now is going to pay off.",
    "Be proud of yourself for putting in this work.",
];
// Disability-aware feedback with emotional intelligence
var generateDisabilityAwareFeedback = function (answer, hasSpeechImpairment, hasVisualImpairment) {
    var length = answer.length;
    var hasSTAR = /when|i had|i was|i worked|i led|i managed|i achieved|i created|i built|i designed/i.test(answer);
    var hasQuantification = /\d+%|increased|reduced|improved|saved|managed|drove|grew|increased|decreased|achieved|completed|led/i.test(answer);
    var hasSpecificExample = /\b(project|team|customers|clients|stakeholders|users|product|system|program|colleagues|department|company|organization)\b/i.test(answer);
    var hasEmotion = /\b(excited|proud|passionate|grateful|thrilled|challenged|frustrated|determined|inspired|motivated)\b/i.test(answer);
    var hasHesitation = /\b(um|uh|like|i think|maybe|sort of|i guess|not sure|i believe)\b/gi.test(answer);
    var hasLearning = /\b(learned|discovered|realized|understood|grew|developed|improved|changed)\b/i.test(answer);
    var hasChallenge = /\b(challenging|difficult|hard|struggle|obstacle|problem|issue|complex| tough)\b/i.test(answer);
    var hasResolution = /\b(resolved|fixed|solved|overcame|addressed|implemented|created|succeeded|achieved|completed)\b/i.test(answer);
    var hasCollaboration = /\b(we|team|together|collaborated|partnered|supported|helped|coordinated)\b/i.test(answer);
    var hasSelfAwareness = /\b(should have|could have|would have|learned that|realized i|i recognize|i understand)\b/i.test(answer);
    var strengths = [];
    var improvements = [];
    // Detect emotional tone
    var emotionalTone = 'neutral';
    var detectedEmotion = '';
    for (var _i = 0, _a = Object.entries(emotionPatterns); _i < _a.length; _i++) {
        var _b = _a[_i], emotion = _b[0], _c = _b[1], pattern = _c.pattern, emoji = _c.emoji;
        if (pattern.test(answer)) {
            emotionalTone = emotion;
            detectedEmotion = emoji;
            break;
        }
    }
    // Empathetic opener selection
    var empatheticOpener = empatheticOpeners[Math.floor(Math.random() * empatheticOpeners.length)];
    // Enhanced strengths detection with empathy
    if (hasSTAR) {
        strengths.push('You structured your answer clearly with a real situation - this helps interviewers follow your journey');
    }
    if (hasQuantification) {
        strengths.push('Including numbers and results shows the concrete impact you made');
    }
    if (hasSpecificExample) {
        strengths.push('Your specific examples make your experience tangible and memorable');
    }
    if (length > 150) {
        strengths.push('You gave a thorough answer - interviewers appreciate candidates who go deep');
    }
    if (/therefore|however|additionally|furthermore|consequently|moreover/i.test(answer)) {
        strengths.push('Your connection words helped your story flow naturally');
    }
    // Emotional intelligence strengths
    if (hasEmotion) {
        strengths.push('Sharing your feelings makes you relatable and human to interviewers');
    }
    if (hasLearning && hasSelfAwareness) {
        strengths.push('Your reflection on what you learned shows maturity and growth mindset');
    }
    if (hasChallenge && hasResolution) {
        strengths.push('Describing how you overcame obstacles demonstrates resilience');
    }
    if (hasCollaboration) {
        strengths.push('Your teamwork focus shows you\'ll be a good cultural fit');
    }
    if (length > 50 && length < 80) {
        strengths.push('You gave a concise answer - sometimes less is more');
    }
    // Improvement suggestions - NEVER mention speech patterns or pace
    if (!hasSTAR) {
        improvements.push('Try the STAR method: paint the picture of the Situation, explain the Task, describe your Action, and share the Result');
    }
    if (!hasQuantification) {
        improvements.push('Adding numbers makes your impact concrete: "increased efficiency by 30%" says more than "improved efficiency"');
    }
    if (!hasSpecificExample) {
        improvements.push('Specific details (project names, team sizes, tools used) make your answer memorable');
    }
    if (length < 50) {
        improvements.push('A bit more detail would help - interviewers want to understand your experience');
    }
    // For very short answers, add encouragement
    if (length < 30) {
        improvements.push('Take your time - there\'s no rush. Share what comes to mind first.');
    }
    // Additional positive reinforcement for users with disabilities
    if (hasSpeechImpairment) {
        strengths.push('Your written communication is clear and well-structured - that\'s a real skill');
        improvements.push('Having key talking points ready can help bridge between written and verbal communication');
    }
    if (hasVisualImpairment) {
        strengths.push('Your verbal description paints a clear picture for listeners');
        improvements.push('Speaking directly to the camera helps create connection');
    }
    // Build feedback with empathy
    var feedback = '';
    if (strengths.length > 0) {
        feedback = strengths[0];
        if (strengths.length > 1) {
            feedback += ' ' + strengths[1];
        }
    }
    if (improvements.length > 0) {
        if (feedback)
            feedback += '. ';
        feedback += improvements[0];
        if (improvements.length > 1 && length > 100) {
            feedback += '. ' + improvements[1];
        }
    }
    if (!feedback) {
        feedback = 'You took the time to answer - that\'s what matters most right now.';
    }
    // Build empathetic message
    var empatheticMessage = empatheticOpener + ' ';
    if (emotionalTone === 'reflective' || emotionalTone === 'humble') {
        empatheticMessage += 'Your thoughtful approach will serve you well. ';
    }
    else if (emotionalTone === 'confident' || emotionalTone === 'determined') {
        empatheticMessage += 'Your confidence is compelling. ';
    }
    else if (emotionalTone === 'enthusiastic') {
        empatheticMessage += 'Your passion clearly comes through. ';
    }
    else if (emotionalTone === 'empathetic') {
        empatheticMessage += 'Your people skills will be valued. ';
    }
    empatheticMessage += empatheticClosers[Math.floor(Math.random() * empatheticClosers.length)];
    return { feedback: feedback, strengths: strengths, improvements: improvements, emotionalTone: detectedEmotion || '💬', empatheticMessage: empatheticMessage };
};
var questionBank = {
    technical: {
        default: [
            'Tell me about a technical project you worked on.',
            'Describe a complex problem you solved.',
            'How do you stay updated with new technologies?',
            'Walk me through your approach to debugging.',
            'Explain a system you designed.',
        ],
        it: [
            'Write a function to reverse a linked list.',
            'Explain the difference between REST and GraphQL.',
            'How would you design a scalable system?',
            'Describe your experience with Agile methodologies.',
            'What are the key principles of clean code?',
        ],
        data: [
            'Explain the difference between supervised and unsupervised learning.',
            'How would you handle missing data in a dataset?',
            'Describe your experience with machine learning pipelines.',
            'What metrics would you use to evaluate a classification model?',
            'Explain overfitting and how to prevent it.',
        ],
    },
    behavioral: {
        default: [
            'Tell me about yourself and your experience.',
            'What are your greatest strengths?',
            'Describe a challenging situation you overcame.',
            'Tell me about a time you failed and what you learned.',
            'Describe a time you worked effectively in a team.',
        ],
        it: [
            'Describe a time you had to learn a new technology quickly.',
            'Tell me about a time you debugged a difficult issue.',
            'Describe your experience working on a team project.',
            'Tell me about a time you had conflicting priorities.',
            'Describe a situation where you had to communicate technical info to non-technical people.',
        ],
        data: [
            'Tell me about a data analysis project you are proud of.',
            'Describe a time you found insights that changed a decision.',
            'How do you ensure data quality and accuracy?',
            'Tell me about a time you presented findings to stakeholders.',
            'Describe your experience collaborating with engineers.',
        ],
    },
    situational: {
        default: [
            'How would you handle a difficult coworker?',
            'What would you do if you missed a deadline?',
            'How would you prioritize multiple urgent tasks?',
            'What would you do if you disagreed with your manager?',
            'How would you handle a project with unclear requirements?',
        ],
        it: [
            'How would you handle a production outage?',
            'What would you do if you discovered a security vulnerability?',
            'How would you approach a project with tight deadlines?',
            'What would you do if asked to implement something you believe is wrong?',
            'How would you handle conflicting requirements from stakeholders?',
        ],
        business: [
            'How would you handle an unhappy customer?',
            'What would you do if sales targets were unrealistic?',
            'How would you approach a new market entry?',
            'What would you do if you discovered financial irregularities?',
            'How would you handle a team conflict?',
        ],
    },
    hr: {
        default: [
            'Why do you want to work here?',
            'Where do you see yourself in 5 years?',
            'What are your greatest strengths and weaknesses?',
            'How do you handle stress and pressure?',
            'Describe your ideal work environment.',
        ],
        it: [
            'What type of work culture do you thrive in?',
            'How do you balance technical excellence with deadlines?',
            'Describe your ideal team dynamic.',
            'What excites you most about our company?',
            'How do you continue learning in your field?',
        ],
    },
};
var SignLanguageAvatar = function (_a) {
    var isActive = _a.isActive;
    var signs = ['🤟', '👋', '✋', '👍', '👌', '🖐️', '🤲', '👆', '👇'];
    var _b = (0, react_1.useState)(0), currentSign = _b[0], setCurrentSign = _b[1];
    (0, react_1.useEffect)(function () {
        if (isActive) {
            var interval_1 = setInterval(function () {
                setCurrentSign(function (prev) { return (prev + 1) % signs.length; });
            }, 1500);
            return function () { return clearInterval(interval_1); };
        }
    }, [isActive]);
    if (!isActive)
        return null;
    return (<div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 100,
            animation: 'slideUp 0.5s ease'
        }}>
      <div style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
            borderRadius: '24px',
            padding: '1.5rem',
            boxShadow: '0 10px 40px rgba(124, 58, 237, 0.4)',
            border: '3px solid rgba(255,255,255,0.3)',
            minWidth: '200px'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
          <div style={{
            width: '72px',
            height: '72px',
            background: 'linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            border: '3px solid white',
            animation: 'pulse 2s infinite'
        }}>
            {signs[currentSign]}
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>
              Sign Language
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>
              Avatar Active
            </div>
          </div>
        </div>
        <div style={{
            padding: '0.75rem',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '0.85rem',
            textAlign: 'center'
        }}>
          Translating question to sign language...
        </div>
      </div>
    </div>);
};
var VideoAvatar = function (_a) {
    var isActive = _a.isActive;
    var videoRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var _a;
        if (isActive) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
                .catch(function (err) { return console.log('Camera access denied:', err); });
        }
        else {
            if ((_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.srcObject) {
                var stream = videoRef.current.srcObject;
                stream.getTracks().forEach(function (track) { return track.stop(); });
            }
        }
    }, [isActive]);
    if (!isActive)
        return null;
    return (<div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '16px',
            padding: '1rem',
            marginBottom: '1.5rem'
        }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem'
        }}>
          🎥
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>
            Video Interview Mode
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
            Camera is active
          </div>
        </div>
      </div>
      <video ref={videoRef} autoPlay muted playsInline style={{
            width: '100%',
            height: '280px',
            objectFit: 'cover',
            borderRadius: '12px',
            background: '#0f172a'
        }}/>
    </div>);
};
var DualVideoMode = function (_a) {
    var videoOn = _a.videoOn, signLanguageDetection = _a.signLanguageDetection;
    var videoRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (videoOn && signLanguageDetection) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
                .catch(function (err) { return console.log('Camera access denied:', err); });
        }
    }, [videoOn && signLanguageDetection]);
    if (!videoOn || !signLanguageDetection)
        return null;
    return (<div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.5rem'
        }}>
      <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '16px',
            padding: '1rem',
            border: '2px solid #3b82f6'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
        }}>
            📹
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>
              Your Camera
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
              Live video feed
            </div>
          </div>
        </div>
        <video ref={videoRef} autoPlay muted playsInline style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '12px',
            background: '#0f172a'
        }}/>
      </div>

      <div style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
            borderRadius: '16px',
            padding: '1rem',
            border: '2px solid #a78bfa'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
        }}>
            🤟
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>
              Sign Language Detection
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
              Real-time gesture recognition
            </div>
          </div>
        </div>
        <div style={{
            height: '180px',
            background: '#0f172a',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem', animation: 'pulse 2s infinite' }}>🤟</div>
          <span>Detecting signs...</span>
        </div>
      </div>
    </div>);
};
function Interview() {
    var profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    var disabilities = profile.disabilities || [];
    var method = profile.method || 'text';
    var hasHearingImpairment = disabilities.includes('hearing');
    var hasVisualImpairment = disabilities.includes('visual');
    var hasSpeechImpairment = disabilities.includes('speech');
    var hasVerbalImpairment = disabilities.includes('verbal');
    var _a = (0, react_1.useState)(profile.role || ''), selectedRole = _a[0], setSelectedRole = _a[1];
    var _b = (0, react_1.useState)(''), selectedIndustry = _b[0], setSelectedIndustry = _b[1];
    var _c = (0, react_1.useState)('behavioral'), selectedMode = _c[0], setSelectedMode = _c[1];
    var _d = (0, react_1.useState)(''), resumeText = _d[0], setResumeText = _d[1];
    var _e = (0, react_1.useState)(''), jobDescription = _e[0], setJobDescription = _e[1];
    var _f = (0, react_1.useState)(null), session = _f[0], setSession = _f[1];
    var _g = (0, react_1.useState)(''), answer = _g[0], setAnswer = _g[1];
    var _h = (0, react_1.useState)(false), isListening = _h[0], setIsListening = _h[1];
    var _j = (0, react_1.useState)(false), isCommandMode = _j[0], setIsCommandMode = _j[1];
    var _k = (0, react_1.useState)(false), showFeedback = _k[0], setShowFeedback = _k[1];
    var _l = (0, react_1.useState)(''), feedback = _l[0], setFeedback = _l[1];
    var _m = (0, react_1.useState)(disabilities.includes('hearing')), signLanguageOn = _m[0], setSignLanguageOn = _m[1];
    var _o = (0, react_1.useState)(hasVerbalImpairment || disabilities.includes('motor')), videoOn = _o[0], setVideoOn = _o[1];
    var _p = (0, react_1.useState)(!disabilities.includes('hearing') || hasVisualImpairment), audioOn = _p[0], setAudioOn = _p[1];
    var _q = (0, react_1.useState)(hasVerbalImpairment), signLanguageDetection = _q[0], setSignLanguageDetection = _q[1];
    var _r = (0, react_1.useState)(''), voiceCommandFeedback = _r[0], setVoiceCommandFeedback = _r[1];
    var _s = (0, react_1.useState)(0), retryCount = _s[0], setRetryCount = _s[1];
    var _t = (0, react_1.useState)(''), followUpAnswer = _t[0], setFollowUpAnswer = _t[1];
    var _u = (0, react_1.useState)({ questions: [], answers: [], followUpQuestions: [], followUpAnswers: [], feedback: [] }), currentSessionData = _u[0], setCurrentSessionData = _u[1];
    // Adaptive Interviewer State
    var _v = (0, react_1.useState)('balanced'), adaptiveMode = _v[0], setAdaptiveMode = _v[1];
    var _w = (0, react_1.useState)('medium'), confidenceLevel = _w[0], setConfidenceLevel = _w[1];
    var _x = (0, react_1.useState)(false), showFollowUp = _x[0], setShowFollowUp = _x[1];
    var _y = (0, react_1.useState)(''), followUpQuestion = _y[0], setFollowUpQuestion = _y[1];
    var recognitionRef = (0, react_1.useRef)(null);
    var commandRecognitionRef = (0, react_1.useRef)(null);
    // Session history for tracking improvement
    var _z = (0, react_1.useState)(function () {
        var saved = localStorage.getItem('interviewHistory');
        return saved ? JSON.parse(saved) : [];
    }), sessionHistory = _z[0], setSessionHistory = _z[1];
    var voiceCommands = [
        { command: 'repeat question', description: 'Hear the current question again', action: 'repeat' },
        { command: 'next question', description: 'Skip to the next question', action: 'next' },
        { command: 'previous question', description: 'Go back to the previous question', action: 'previous' },
        { command: 'pause interview', description: 'Pause the interview', action: 'pause' },
        { command: 'resume interview', description: 'Resume the interview', action: 'resume' },
        { command: 'submit answer', description: 'Submit your current answer', action: 'submit' },
        { command: 'start interview', description: 'Begin the interview', action: 'start' },
        { command: 'listen to me', description: 'Start voice input for your answer', action: 'listen' },
    ];
    var executeCommand = function (action) {
        switch (action) {
            case 'repeat':
                if (session && currentQuestion) {
                    speakQuestion(currentQuestion);
                    setVoiceCommandFeedback('Repeating question...');
                }
                break;
            case 'next':
                nextQuestion();
                setVoiceCommandFeedback('Moving to next question...');
                break;
            case 'previous':
                if (session && session.currentIndex > 0) {
                    setSession(__assign(__assign({}, session), { currentIndex: session.currentIndex - 1 }));
                    setAnswer('');
                    setShowFeedback(false);
                    setVoiceCommandFeedback('Going to previous question...');
                }
                break;
            case 'pause':
                if (session) {
                    setSession(__assign(__assign({}, session), { paused: true }));
                    setVoiceCommandFeedback('Interview paused');
                }
                break;
            case 'resume':
                if (session) {
                    setSession(__assign(__assign({}, session), { paused: false }));
                    setVoiceCommandFeedback('Interview resumed');
                }
                break;
            case 'submit':
                if (answer.trim()) {
                    submitAnswer();
                    setVoiceCommandFeedback('Answer submitted');
                }
                else {
                    setVoiceCommandFeedback('No answer to submit');
                }
                break;
            case 'start':
                if (!session && selectedRole) {
                    startInterview();
                    setVoiceCommandFeedback('Interview started');
                }
                break;
            case 'listen':
                if (!hasSpeechImpairment) {
                    handleVoiceInput();
                }
                break;
        }
        setTimeout(function () { return setVoiceCommandFeedback(''); }, 3000);
    };
    var startCommandRecognition = function () {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition)
            return;
        if (commandRecognitionRef.current) {
            commandRecognitionRef.current.stop();
            setIsCommandMode(false);
            return;
        }
        var recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        recognition.onresult = function (event) {
            var transcript = Array.from(event.results)
                .map(function (result) { return result[0].transcript; })
                .join('')
                .toLowerCase();
            for (var _i = 0, voiceCommands_1 = voiceCommands; _i < voiceCommands_1.length; _i++) {
                var cmd = voiceCommands_1[_i];
                if (transcript.includes(cmd.command)) {
                    executeCommand(cmd.action);
                    break;
                }
            }
        };
        recognition.onerror = function () {
            setIsCommandMode(false);
        };
        recognition.onend = function () {
            if (isCommandMode) {
                recognition.start();
            }
        };
        commandRecognitionRef.current = recognition;
        recognition.start();
        setIsCommandMode(true);
        setVoiceCommandFeedback('Voice commands activated - say a command');
        setTimeout(function () { return setVoiceCommandFeedback(''); }, 3000);
    };
    var startInterview = function () {
        var questions = [];
        var industryKey = selectedIndustry || 'default';
        var modeKey = selectedMode;
        // Get base questions from question bank
        if (questionBank[modeKey] && questionBank[modeKey][industryKey]) {
            questions = __spreadArray([], questionBank[modeKey][industryKey], true);
        }
        else if (questionBank[modeKey] && questionBank[modeKey]['default']) {
            questions = __spreadArray([], questionBank[modeKey]['default'], true);
        }
        else {
            questions = __spreadArray([], questionBank.behavioral.default, true);
        }
        // Resume-driven personalized questions
        if (resumeText || jobDescription) {
            var resumeQuestions = generateResumeQuestions(resumeText + ' ' + jobDescription, selectedRole || selectedIndustry || '');
            // Insert personalized questions in strategic positions
            questions = __spreadArray(__spreadArray(__spreadArray(__spreadArray([
                questions[0]
            ], resumeQuestions.slice(0, 2), true), questions.slice(1, 3), true), resumeQuestions.slice(2, 4), true), questions.slice(3), true).filter(Boolean);
        }
        setSession({ questions: questions, currentIndex: 0, paused: false });
        setShowFeedback(false);
        setFeedback('');
        setAnswer('');
        setRetryCount(0);
        setCurrentSessionData({
            questions: questions,
            answers: [],
            followUpQuestions: [],
            followUpAnswers: [],
            feedback: []
        });
        if (hasVisualImpairment) {
            setTimeout(function () {
                announce("Interview started. Question 1 of ".concat(questions.length, ". ").concat(questions[0]));
            }, 500);
        }
    };
    var handleVoiceInput = function () {
        if (isListening) {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setIsListening(false);
            return;
        }
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech recognition not supported in this browser');
            return;
        }
        var recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.onresult = function (event) {
            var transcript = Array.from(event.results)
                .map(function (result) { return result[0].transcript; })
                .join('');
            setAnswer(function (prev) { return prev + ' ' + transcript; });
        };
        recognition.onend = function () { return setIsListening(false); };
        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
    };
    // Adaptive Interviewer Functions
    var analyzeConfidence = function (answerText) {
        var length = answerText.length;
        var hasExamples = /example|specific|when|i led|i managed|i achieved|i increased/i.test(answerText);
        var hasHesitation = /um|uh|like|i think|maybe|sort of|i guess|not sure/i.test(answerText);
        var isComplete = length > 100 && hasExamples;
        if (isComplete && !hasHesitation)
            return 'high';
        if (length < 50 || hasHesitation)
            return 'low';
        return 'medium';
    };
    // Follow-Up Question Intelligence Engine
    var extractTopics = function (answer) {
        var topics = [];
        var lowerAnswer = answer.toLowerCase();
        var topicPatterns = {
            leadership: ['lead', 'managed', 'team', 'supervise', 'mentor', 'coach', 'direct', 'guide'],
            technical: ['code', 'develop', 'system', 'software', 'api', 'database', 'algorithm', 'programming'],
            problem: ['problem', 'issue', 'challenge', 'difficult', 'obstacle', 'conflict', 'resolution'],
            achievement: ['achieved', 'increased', 'improved', 'reduced', 'saved', 'won', 'success', 'accomplish'],
            collaboration: ['team', 'collaborate', 'work with', 'partner', 'stakeholder', 'cross-functional'],
            communication: ['present', 'present', 'explain', 'communicate', 'report', 'document'],
            learning: ['learn', 'study', 'train', 'develop skill', 'certification', 'course', 'workshop'],
            innovation: ['innovat', 'creat', 'new', 'improv', 'design', 'invent', 'novel'],
        };
        for (var _i = 0, _a = Object.entries(topicPatterns); _i < _a.length; _i++) {
            var _b = _a[_i], topic = _b[0], patterns = _b[1];
            if (patterns.some(function (p) { return lowerAnswer.includes(p); })) {
                topics.push(topic);
            }
        }
        return topics;
    };
    // Empathetic follow-up question generation with emotional intelligence
    var generateContextualFollowUp = function (_question, answer, confidence, topics, mode) {
        // Detect emotional cues in the answer
        var hasPride = /\b(proud|accomplished|thrilled|excited|achieved|succeeded)\b/i.test(answer);
        var hasDifficulty = /\b(challenging|difficult|hard|struggle|overcome|obstacle|stress)\b/i.test(answer);
        var hasCollaboration = /\b(we|team|together|collaborated|supported|helped)\b/i.test(answer);
        var hasLearning = /\b(learned|discovered|realized|understood|grew|developed)\b/i.test(answer);
        var hasHesitation = /\b(um|uh|like|i think|maybe|perhaps|i guess)\b/gi.test(answer);
        var hasSelfReflection = /\b(i should have|i could have|i realized|i recognize|i understand now)\b/i.test(answer);
        // Empathetic "Why" questions - probe reasoning with warmth
        var whyFollowUps = [
            'Why was that approach important to you?',
            'Why did you choose that particular solution?',
            'Why do you think that was the best way to handle it?',
            'Why did you decide to take that specific path?',
        ];
        // Empathetic "How" questions - probe process
        var howFollowUps = [
            'How did you handle the most difficult aspect of that?',
            'How did you measure whether it was successful?',
            'How did you coordinate with others involved?',
            'How did you prioritize what to focus on?',
        ];
        // "What if" questions - hypothetical scenarios
        var whatIfFollowUps = [
            'What would you do differently if you faced the same situation again?',
            'What would have happened if you hadn\'t taken that approach?',
            'What other options did you consider, and why did you reject them?',
        ];
        // Evidence/Example questions with empathy
        var evidenceFollowUps = [
            'Can you give me a specific example that illustrates that?',
            'Can you walk me through exactly what happened?',
            'What was the most memorable part of that experience for you?',
            'Tell me more about the details - what stands out?',
        ];
        // Reflection questions that validate emotions
        var reflectionFollowUps = [
            'What did you learn from that experience that surprised you?',
            'How has that shaped how you approach similar situations now?',
            'What would you tell your past self about handling that?',
            'How did that experience impact your professional growth?',
        ];
        // Challenge questions that push gently
        var challengeFollowUps = [
            'What would have made that outcome even better?',
            'What did you learn from any mistakes along the way?',
            'How would you handle it if you faced the same challenge today?',
        ];
        // Supportive follow-ups for less confident answers
        var supportiveFollowUps = [
            'That\'s a great starting point. Can you tell me more about how you felt during that?',
            'I appreciate you sharing that. What was the most rewarding part?',
            'That shows real self-awareness. How did that experience change you?',
        ];
        // Topic-specific follow-ups with empathy
        var topicSpecificFollowUps = {
            leadership: [
                'How did you motivate your team during those challenging times?',
                'How did you handle supporting team members who were struggling?',
                'What leadership moment are you most proud of?',
            ],
            technical: [
                'What technical constraints did you need to navigate?',
                'How did you ensure the solution would scale?',
                'What trade-offs did you have to make, and how did you decide?',
            ],
            problem: [
                'What was your first step when you realized there was a problem?',
                'How did you keep stakeholders informed throughout?',
                'What resources did you need, and how did you get them?',
            ],
            achievement: [
                'What metrics demonstrated your success?',
                'How did that achievement impact the broader team or company?',
                'What recognition (formal or informal) did you receive?',
            ],
            collaboration: [
                'How did you handle disagreements with team members?',
                'How did you ensure everyone felt heard and valued?',
                'What was the biggest challenge in working with others, and how did you address it?',
            ],
            learning: [
                'How did you apply what you learned?',
                'What resources or people helped you the most?',
                'How long did it take to feel comfortable with that new skill?',
            ],
            innovation: [
                'How did you get buy-in from others for your idea?',
                'What resistance did you face, and how did you overcome it?',
                'How do you typically come up with new ideas?',
            ],
        };
        // Determine follow-up type based on answer characteristics with empathy
        var followUpType = 'depth';
        // Low confidence - be supportive
        if (confidence === 'low' || hasHesitation.length > 2) {
            followUpType = 'supportive';
        }
        // High confidence with reflection - go deeper
        else if (hasSelfReflection && confidence === 'high') {
            followUpType = 'challenge';
        }
        // Has emotion about achievement - reflect on feelings
        else if (hasPride) {
            followUpType = 'reflection';
        }
        // Has difficulty mentioned - acknowledge and probe
        else if (hasDifficulty) {
            followUpType = 'evidence';
        }
        // Collaborative answer - explore team dynamics
        else if (hasCollaboration) {
            followUpType = 'depth';
        }
        // Has learning - explore growth
        else if (hasLearning) {
            followUpType = 'reflection';
        }
        // Default based on content
        else if (/i think|i believe|i felt|i felt like/i.test(answer)) {
            followUpType = 'evidence';
        }
        else if (/because|reason|that's why/i.test(answer)) {
            followUpType = 'depth';
        }
        else if (confidence === 'high') {
            followUpType = Math.random() > 0.5 ? 'hypothetical' : 'depth';
        }
        // Check for specific phrases that change the approach
        if (/example|specific|instance|when i was|there was a time/i.test(answer)) {
            followUpType = 'reflection';
        }
        // Build candidate follow-ups
        var candidates = [];
        // Add topic-specific follow-ups first (most relevant)
        for (var _i = 0, topics_2 = topics; _i < topics_2.length; _i++) {
            var topic = topics_2[_i];
            if (topicSpecificFollowUps[topic]) {
                candidates.push.apply(candidates, topicSpecificFollowUps[topic]);
            }
        }
        // Add type-based follow-ups
        switch (followUpType) {
            case 'supportive':
                candidates.push.apply(candidates, __spreadArray(__spreadArray([], supportiveFollowUps, false), evidenceFollowUps, false));
                break;
            case 'challenge':
                candidates.push.apply(candidates, __spreadArray(__spreadArray([], challengeFollowUps, false), whatIfFollowUps, false));
                break;
            case 'clarification':
                candidates.push.apply(candidates, evidenceFollowUps);
                break;
            case 'depth':
                candidates.push.apply(candidates, __spreadArray(__spreadArray([], whyFollowUps, false), howFollowUps, false));
                break;
            case 'hypothetical':
                candidates.push.apply(candidates, whatIfFollowUps);
                break;
            case 'evidence':
                candidates.push.apply(candidates, evidenceFollowUps);
                break;
            case 'reflection':
                candidates.push.apply(candidates, reflectionFollowUps);
                break;
        }
        // Mode-based variation (respect the user's chosen mode)
        if (mode === 'challenging') {
            candidates.push.apply(candidates, __spreadArray(__spreadArray([], challengeFollowUps, false), ['What evidence supports your approach?',
                'How would a peer evaluate what you did?'], false));
        }
        else if (mode === 'supportive') {
            candidates.push.apply(candidates, __spreadArray(__spreadArray([], reflectionFollowUps, false), ['That sounds like a meaningful experience. What did you enjoy most?',
                'How did that make you feel professionally?'], false));
        }
        // Remove duplicates and return random selection
        var uniqueCandidates = __spreadArray([], new Set(candidates), true);
        return uniqueCandidates[Math.floor(Math.random() * uniqueCandidates.length)];
    };
    // Determine follow-up type based on answer characteristics
    var followUpType = 'depth';
    if (/i think|i believe|i felt|i felt like/i.test(answer)) {
        followUpType = 'clarification';
    }
    else if (/because|reason|that\'s why/i.test(answer)) {
        followUpType = 'depth';
    }
    else if (confidence === 'high') {
        followUpType = Math.random() > 0.5 ? 'hypothetical' : 'depth';
    }
    else if (confidence === 'low') {
        followUpType = 'evidence';
    }
    // Check for specific phrases that warrant different follow-ups
    if (/example|specific|instance|when i was|there was a time/i.test(answer)) {
        followUpType = 'reflection';
    }
    // Build candidate follow-ups
    var candidates = [];
    // Add topic-specific follow-ups
    for (var _i = 0, topics_1 = topics; _i < topics_1.length; _i++) {
        var topic = topics_1[_i];
        if (topicSpecificFollowUps[topic]) {
            candidates.push.apply(candidates, topicSpecificFollowUps[topic]);
        }
    }
    // Add type-based follow-ups
    switch (followUpType) {
        case 'supportive':
            candidates.push.apply(candidates, __spreadArray(__spreadArray([], supportiveFollowUps, false), evidenceFollowUps, false));
            break;
        case 'challenge':
            candidates.push.apply(candidates, __spreadArray(__spreadArray([], challengeFollowUps, false), whatIfFollowUps, false));
            break;
        case 'clarification':
            candidates.push.apply(candidates, evidenceFollowUps);
            break;
        case 'depth':
            candidates.push.apply(candidates, __spreadArray(__spreadArray([], whyFollowUps, false), howFollowUps, false));
            break;
        case 'hypothetical':
            candidates.push.apply(candidates, whatIfFollowUps);
            break;
        case 'evidence':
            candidates.push.apply(candidates, evidenceFollowUps);
            break;
        case 'reflection':
            candidates.push.apply(candidates, reflectionFollowUps);
            break;
    }
    // Mode-based variation
    if (mode === 'challenging') {
        candidates.push.apply(candidates, __spreadArray(__spreadArray([], whatIfFollowUps, false), ['Can you defend that decision?',
            'What evidence supports your approach?',
            'How would a peer evaluate what you did?'], false));
    }
    else if (adaptiveMode === 'supportive') {
        candidates.push.apply(candidates, __spreadArray(__spreadArray([], reflectionFollowUps, false), ['That sounds like a great experience. What did you enjoy most?',
            'How did that make you feel professionally?'], false));
    }
    // Remove duplicates and return random selection
    var uniqueCandidates = __spreadArray([], new Set(candidates), true);
    return uniqueCandidates[Math.floor(Math.random() * uniqueCandidates.length)];
}
var adaptInterviewerBehavior = function (confidence) {
    if (confidence === 'high') {
        setAdaptiveMode('challenging');
    }
    else if (confidence === 'low') {
        setAdaptiveMode('supportive');
    }
    else {
        setAdaptiveMode('balanced');
    }
    setConfidenceLevel(confidence);
};
var submitAnswer = function (isRetry) {
    if (isRetry === void 0) { isRetry = false; }
    // Analyze confidence level from answer
    var confidence = analyzeConfidence(answer);
    adaptInterviewerBehavior(confidence);
    // Use disability-aware feedback generation with emotional intelligence
    var _a = generateDisabilityAwareFeedback(answer, hasSpeechImpairment, hasVisualImpairment), feedback = _a.feedback, strengths = _a.strengths, improvements = _a.improvements, emotionalTone = _a.emotionalTone, empatheticMessage = _a.empatheticMessage;
    // Adaptive interviewer response based on confidence with empathy
    var interviewerResponse = '';
    if (adaptiveMode === 'challenging') {
        interviewerResponse = "That's a strong answer. Let's dig deeper...";
    }
    else if (adaptiveMode === 'supportive') {
        interviewerResponse = "Thank you for sharing that. I appreciate your openness.";
    }
    else {
        interviewerResponse = "I appreciate that response. Let me follow up on that.";
    }
    // Add encouraging prefix based on emotional tone
    var encouragingPrefixes = {
        '😊': ['That\'s wonderful! ', 'I love that energy! ', 'Your enthusiasm shines through! '],
        '🤔': ['That\'s thoughtful! ', 'I appreciate your reflection. ', 'Good insight! '],
        '💪': ['That\'s confident! ', 'I admire your certainty! ', 'Great conviction! '],
        '🌱': ['That shows real growth! ', 'I appreciate your humility. ', 'That takes self-awareness! '],
        '🎯': ['That\'s focused! ', 'Your determination shows! ', 'Great direction! '],
        '🤝': ['That\'s the heart of teamwork! ', 'Your empathy is valuable! ', 'Great perspective! '],
        '💬': ['Good response! ', 'Well done! ', 'Excellent! '],
    };
    var prefixOptions = encouragingPrefixes[emotionalTone] || encouragingPrefixes['💬'];
    var selectedFeedback = interviewerResponse + ' ' + prefixOptions[Math.floor(Math.random() * prefixOptions.length)] + feedback + '\n\n' + empatheticMessage;
    // Store detailed feedback for display
    setFeedback(selectedFeedback);
    setShowFeedback(true);
    // Save answer to session data
    if (session && !isRetry) {
        var updatedAnswers = __spreadArray([], currentSessionData.answers, true);
        var updatedFeedback = __spreadArray([], currentSessionData.feedback, true);
        updatedAnswers[session.currentIndex] = answer;
        updatedFeedback[session.currentIndex] = selectedFeedback;
        var updatedFollowUpQ = __spreadArray([], currentSessionData.followUpQuestions, true);
        var updatedFollowUpA = __spreadArray([], currentSessionData.followUpAnswers, true);
        if (followUpQuestion) {
            updatedFollowUpQ[session.currentIndex] = followUpQuestion;
            updatedFollowUpA[session.currentIndex] = followUpAnswer;
        }
        setCurrentSessionData(__assign(__assign({}, currentSessionData), { answers: updatedAnswers, feedback: updatedFeedback, followUpQuestions: updatedFollowUpQ, followUpAnswers: updatedFollowUpA }));
    }
    setFeedback(selectedFeedback);
    setShowFeedback(true);
    // Generate follow-up question using Intelligence Engine
    if (currentQuestion && !isRetry) {
        var topics = extractTopics(answer);
        var followUp = generateContextualFollowUp(currentQuestion, answer, confidence, topics, adaptiveMode);
        setFollowUpQuestion(followUp);
        setShowFollowUp(true);
        setFollowUpAnswer('');
    }
    // Calculate scores based on actual answer quality
    var communication = 70;
    var reasoning = 65;
    var readiness = 70;
    if (strengths.length >= 2)
        communication += 15;
    if (/star|when|i had|i worked|i led/i.test(answer))
        reasoning += 15;
    if (improvements.length <= 1)
        readiness += 10;
    communication = Math.min(communication + Math.floor(Math.random() * 15), 100);
    reasoning = Math.min(reasoning + Math.floor(Math.random() * 15), 100);
    readiness = Math.min(readiness + Math.floor(Math.random() * 15), 100);
    if (!isRetry && answer.trim()) {
        var overallScore = Math.floor((communication + reasoning + readiness) / 3);
        var newHistory = __spreadArray(__spreadArray([], sessionHistory, true), [{
                date: new Date().toISOString(),
                mode: selectedMode,
                score: overallScore,
                communication: communication,
                reasoning: reasoning,
                readiness: readiness
            }], false);
        setSessionHistory(newHistory);
        localStorage.setItem('interviewHistory', JSON.stringify(newHistory));
        // Save full session for replay
        var fullSessions = JSON.parse(localStorage.getItem('interviewFullSessions') || '[]');
        var newSession = {
            id: "session-".concat(Date.now()),
            date: new Date().toISOString(),
            role: selectedRole || 'General',
            industry: selectedIndustry || 'General',
            mode: selectedMode,
            questions: currentSessionData.questions,
            answers: currentSessionData.answers,
            followUpQuestions: currentSessionData.followUpQuestions,
            followUpAnswers: currentSessionData.followUpAnswers,
            feedback: currentSessionData.feedback,
            scores: { communication: communication, reasoning: reasoning, readiness: readiness },
            analysis: {
                strongMoments: [],
                hesitationPoints: [],
                missedOpportunities: []
            }
        };
        fullSessions.unshift(newSession);
        localStorage.setItem('interviewFullSessions', JSON.stringify(fullSessions.slice(0, 20)));
    }
    if (hasVisualImpairment) {
        var audioFeedback = "Answer submitted. ".concat(selectedFeedback);
        if (followUpQuestion) {
            audioFeedback += " Follow-up question: ".concat(followUpQuestion);
        }
        announce(audioFeedback);
    }
};
var retryAnswer = function () {
    setRetryCount(function (prev) { return prev + 1; });
    setShowFeedback(false);
    setFeedback('');
    setAnswer('');
    announce('You can now retry your answer. Take your time.');
};
var rephraseAnswer = function () {
    var starters = [
        'In my experience,',
        'One example from my background is',
        'To illustrate,',
        'A relevant situation was when',
    ];
    var repHRased = "".concat(starters[Math.floor(Math.random() * starters.length)], " ").concat(answer);
    setAnswer(repHRased);
    announce('Your answer has been rephrased. You can edit it further or submit.');
};
var submitFollowUpAnswer = function () {
    if (!followUpAnswer.trim())
        return;
    // Generate final interviewer response
    var response = "That's insightful. You've demonstrated good critical thinking.";
    if (confidenceLevel === 'high') {
        response = "Excellent depth in your reasoning. You clearly thought this through.";
    }
    else if (confidenceLevel === 'low') {
        response = "Thank you for sharing that additional perspective.";
    }
    setFeedback(function (prev) { return prev + ' ' + response; });
    if (hasVisualImpairment) {
        announce("Follow-up answered. ".concat(response));
    }
};
var nextQuestion = function () {
    if (session && session.currentIndex < session.questions.length - 1 && !session.paused) {
        var nextIndex_1 = session.currentIndex + 1;
        setSession(__assign(__assign({}, session), { currentIndex: nextIndex_1 }));
        setAnswer('');
        setShowFeedback(false);
        setFeedback('');
        if (hasVisualImpairment) {
            setTimeout(function () {
                announce("Question ".concat(nextIndex_1 + 1, " of ").concat(session.questions.length, ". ").concat(session.questions[nextIndex_1]));
            }, 500);
        }
    }
};
var speakQuestion = function (text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
};
var announce = function (text) {
    if ('speechSynthesis' in window && (hasVisualImpairment || audioOn)) {
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }
};
(0, react_1.useEffect)(function () {
    return function () {
        if (commandRecognitionRef.current) {
            commandRecognitionRef.current.stop();
        }
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    };
}, []);
(0, react_1.useEffect)(function () {
    if (session && currentQuestion && (hasVisualImpairment || audioOn) && !session.paused) {
        speakQuestion(currentQuestion);
    }
}, [session === null || session === void 0 ? void 0 : session.currentIndex]);
var currentQuestion = session ? session.questions[session.currentIndex] : '';
return (<div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem'
    }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <react_router_dom_1.Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{
        width: '40px',
        height: '40px',
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem'
    }}>
              ♿
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>AccessPrep</span>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to="/dashboard" style={{ fontWeight: 600, color: 'var(--dark)', textDecoration: 'none' }}>← Back</react_router_dom_1.Link>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {hasVisualImpairment && audioOn && (<div style={{
            padding: '0.75rem 1.25rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '25px',
            border: '2px solid #10b981',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
                <span style={{ fontSize: '1.25rem' }}>🔊</span>
                <span style={{ fontWeight: 600, color: 'white' }}>Audio Mode On</span>
              </div>)}

            <div style={{
        padding: '0.75rem 1.25rem',
        background: isCommandMode ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'white',
        borderRadius: '25px',
        border: "2px solid ".concat(isCommandMode ? '#f59e0b' : '#e2e8f0'),
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s'
    }} onClick={startCommandRecognition}>
              <span style={{ fontSize: '1.25rem' }}>🎙️</span>
              <span style={{ fontWeight: 600, color: isCommandMode ? 'white' : 'var(--dark)' }}>
                {isCommandMode ? 'Commands On' : 'Voice Commands'}
              </span>
            </div>

            <div style={{
        padding: '0.75rem 1.25rem',
        background: videoOn ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'white',
        borderRadius: '25px',
        border: "2px solid ".concat(videoOn ? '#3b82f6' : '#e2e8f0'),
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s'
    }} onClick={function () { return setVideoOn(!videoOn); }}>
              <span style={{ fontSize: '1.25rem' }}>🎥</span>
              <span style={{ fontWeight: 600, color: videoOn ? 'white' : 'var(--dark)' }}>Video</span>
            </div>

            {!hasHearingImpairment && (<div style={{
            padding: '0.75rem 1.25rem',
            background: audioOn ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'white',
            borderRadius: '25px',
            border: "2px solid ".concat(audioOn ? '#10b981' : '#e2e8f0'),
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
        }} onClick={function () { return setAudioOn(!audioOn); }}>
                <span style={{ fontSize: '1.25rem' }}>🔊</span>
                <span style={{ fontWeight: 600, color: audioOn ? 'white' : 'var(--dark)' }}>Voice</span>
              </div>)}

            {hasHearingImpairment && (<div style={{
            padding: '0.75rem 1.25rem',
            background: signLanguageOn ? 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)' : 'white',
            borderRadius: '25px',
            border: "2px solid ".concat(signLanguageOn ? '#7c3aed' : '#e2e8f0'),
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
        }} onClick={function () { return setSignLanguageOn(!signLanguageOn); }}>
                <span style={{ fontSize: '1.25rem' }}>🤟</span>
                <span style={{ fontWeight: 600, color: signLanguageOn ? 'white' : 'var(--dark)' }}>Sign Language</span>
              </div>)}

            {hasVerbalImpairment && (<div style={{
            padding: '0.75rem 1.25rem',
            background: signLanguageDetection ? 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)' : 'white',
            borderRadius: '25px',
            border: "2px solid ".concat(signLanguageDetection ? '#7c3aed' : '#e2e8f0'),
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
        }} onClick={function () { return setSignLanguageDetection(!signLanguageDetection); }}>
                <span style={{ fontSize: '1.25rem' }}>🤟</span>
                <span style={{ fontWeight: 600, color: signLanguageDetection ? 'white' : 'var(--dark)' }}>
                  Sign Detection
                </span>
              </div>)}
          </div>

              {/* Adaptive Interviewer Mode */}
          {session && (<div style={{ marginBottom: '1.5rem' }}>
              <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem'
        }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--gray)' }}>
                  🎭 Adaptive Interviewer Style
                </div>
                <div style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.7rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
        }}>
                  <span>🧠</span> Follow-Up AI Active
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button onClick={function () { setAdaptiveMode('supportive'); }} style={{
            padding: '0.5rem 1rem',
            background: adaptiveMode === 'supportive' ? '#d1fae5' : 'white',
            border: "2px solid ".concat(adaptiveMode === 'supportive' ? '#10b981' : '#e2e8f0'),
            borderRadius: '20px',
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontWeight: adaptiveMode === 'supportive' ? 600 : 400
        }}>
                  😊 Supportive
                </button>
                <button onClick={function () { setAdaptiveMode('balanced'); }} style={{
            padding: '0.5rem 1rem',
            background: adaptiveMode === 'balanced' ? '#dbeafe' : 'white',
            border: "2px solid ".concat(adaptiveMode === 'balanced' ? '#3b82f6' : '#e2e8f0'),
            borderRadius: '20px',
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontWeight: adaptiveMode === 'balanced' ? 600 : 400
        }}>
                  🎯 Balanced
                </button>
                <button onClick={function () { setAdaptiveMode('challenging'); }} style={{
            padding: '0.5rem 1rem',
            background: adaptiveMode === 'challenging' ? '#fee2e2' : 'white',
            border: "2px solid ".concat(adaptiveMode === 'challenging' ? '#ef4444' : '#e2e8f0'),
            borderRadius: '20px',
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontWeight: adaptiveMode === 'challenging' ? 600 : 400
        }}>
                  😰 Challenging
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                {adaptiveMode === 'supportive' && '😊 Friendly interviewer who asks simple follow-ups and goes easy on you'}
                {adaptiveMode === 'balanced' && '🎯 Standard interview with balanced follow-up questions'}
                {adaptiveMode === 'challenging' && '😰 Tough interviewer who digs deeper with harder follow-ups'}
              </p>
            </div>)}

          {!session && (<div className="card animate-slide-up">
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                🎯 Practice Interview
              </h2>

              {/* Industry Selection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="label">🏭 Industry</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {industries.map(function (ind) { return (<button key={ind.id} onClick={function () { return setSelectedIndustry(ind.id); }} style={{
                padding: '0.5rem 1rem',
                background: selectedIndustry === ind.id ? 'var(--primary)' : 'var(--bg-primary)',
                color: selectedIndustry === ind.id ? 'white' : 'var(--text-primary)',
                border: "2px solid ".concat(selectedIndustry === ind.id ? 'var(--primary)' : 'var(--border-color)'),
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: selectedIndustry === ind.id ? 600 : 400,
                fontSize: '0.9rem'
            }}>
                      {ind.label}
                    </button>); })}
                </div>
              </div>

              {/* Interview Mode Selection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="label">🎭 Interview Mode</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {interviewModes.map(function (mode) { return (<div key={mode.id} onClick={function () { return setSelectedMode(mode.id); }} style={{
                padding: '1rem',
                background: selectedMode === mode.id ? 'rgba(124, 58, 237, 0.1)' : 'var(--bg-primary)',
                border: "2px solid ".concat(selectedMode === mode.id ? 'var(--primary)' : 'var(--border-color)'),
                borderRadius: '12px',
                cursor: 'pointer'
            }}>
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{mode.label}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{mode.description}</div>
                    </div>); })}
                </div>
              </div>

              {/* Job Role Selection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="label">Select Job Role</label>
                <select className="input" value={selectedRole} onChange={function (e) { return setSelectedRole(e.target.value); }}>
                  <option value="">Choose a role...</option>
                  {selectedIndustry
            ? (_a = industries.find(function (i) { return i.id === selectedIndustry; })) === null || _a === void 0 ? void 0 : _a.roles.map(function (role) { return (<option key={role} value={role}>{role}</option>); })
            : industries.flatMap(function (i) { return i.roles; }).sort().map(function (role) { return (<option key={role} value={role}>{role}</option>); })}
                </select>
              </div>

              {/* Resume Text Input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="label">📄 Your Resume (Optional)</label>
                <textarea className="input" value={resumeText} onChange={function (e) { return setResumeText(e.target.value); }} placeholder="Paste your resume content here for personalized questions..." rows={4}/>
                <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>
                  Questions will be tailored to your experience
                </p>
              </div>

              {/* Job Description Input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="label">📋 Job Description (Optional)</label>
                <textarea className="input" value={jobDescription} onChange={function (e) { return setJobDescription(e.target.value); }} placeholder="Paste the job description for targeted questions..." rows={3}/>
              </div>

              <button onClick={startInterview} className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={!selectedRole}>
                Start Interview 🚀
              </button>
            </div>)}

          {session && (<div>
              {voiceCommandFeedback && (<div style={{
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                color: 'white',
                fontWeight: 600,
                textAlign: 'center',
                animation: 'slideUp 0.3s ease'
            }}>
                  🎙️ {voiceCommandFeedback}
                </div>)}

              {session.paused && (<div style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '16px',
                marginBottom: '1.5rem',
                textAlign: 'center'
            }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏸️</div>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Interview Paused</h3>
                  <p>Say "resume interview" to continue or click below</p>
                  <button onClick={function () { return setSession(__assign(__assign({}, session), { paused: false })); }} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Resume Interview ▶️
                  </button>
                </div>)}

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>Question {session.currentIndex + 1} of {session.questions.length}</span>
                  <span style={{ color: 'var(--gray)' }}>{Math.round(((session.currentIndex + 1) / session.questions.length) * 100)}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px' }}>
                  <div style={{
            height: '100%',
            width: "".concat(((session.currentIndex + 1) / session.questions.length) * 100, "%"),
            background: 'linear-gradient(90deg, var(--primary), var(--primary-light))',
            borderRadius: '4px'
        }}/>
                </div>
              </div>

              {videoOn && <VideoAvatar isActive={videoOn}/>}
              <DualVideoMode videoOn={videoOn} signLanguageDetection={signLanguageDetection}/>

              <div className="card">
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  {currentQuestion}
                </h3>

                {(hasVisualImpairment || audioOn) && !hasHearingImpairment && (<button onClick={function () { return speakQuestion(currentQuestion); }} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
                    🔊 Listen to Question
                  </button>)}

                <div style={{ marginBottom: '1rem' }}>
                  <label className="label">Your Answer</label>
                  <textarea className="input" value={answer} onChange={function (e) { return setAnswer(e.target.value); }} placeholder={hasSpeechImpairment || method === 'text' ? "Type your answer here..." : "Speak or type your answer..."} rows={6} style={{ minHeight: '150px' }}/>
                </div>

                {(method === 'voice' || method === 'hybrid') && !hasSpeechImpairment && (<button onClick={handleVoiceInput} className="btn" style={{
                background: isListening ? '#fee2e2' : 'var(--light)',
                marginBottom: '1rem'
            }}>
                    {isListening ? '⏹️ Listening...' : '🎤 Click to Speak'}
                  </button>)}

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={function () { return submitAnswer(false); }} className="btn btn-primary" style={{ flex: 1, minWidth: '150px' }} disabled={!answer.trim()}>
                    Submit Answer
                  </button>
                  {showFeedback && (<button onClick={retryAnswer} className="btn btn-secondary">
                      🔄 Retry
                    </button>)}
                  {answer.trim() && !showFeedback && (<button onClick={rephraseAnswer} className="btn btn-secondary">
                      ✨ Rephrase
                    </button>)}
                  {session.currentIndex < session.questions.length - 1 && showFeedback && (<button onClick={nextQuestion} className="btn btn-secondary">
                      Next →
                    </button>)}
                </div>

                {retryCount > 0 && (<p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--primary)' }}>
                    You've retried {retryCount} time(s). Keep practicing - there's no penalty for trying again!
                  </p>)}
              </div>

              {showFeedback && (<div className="card" style={{
                marginTop: '1.5rem',
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            }}>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#065f46' }}>✨ Feedback</h4>
                  <p style={{ color: '#065f46', marginBottom: '1rem' }}>{feedback}</p>
                  
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 600, color: '#065f46', fontSize: '0.9rem', marginBottom: '0.5rem' }}>✓ What you did well:</div>
                    <ul style={{ paddingLeft: '1.25rem', color: '#065f46', fontSize: '0.85rem' }}>
                      <li>Clearly communicated your experience and background</li>
                      <li>Structure your answers with relevant examples</li>
                      <li>Keep practicing to build more confidence</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div style={{ fontWeight: 600, color: '#92400e', fontSize: '0.9rem', marginBottom: '0.5rem' }}>→ Suggestions for improvement:</div>
                    <ul style={{ paddingLeft: '1.25rem', color: '#92400e', fontSize: '0.85rem' }}>
                      <li>Try using the STAR method to structure your answers</li>
                      <li>Add specific numbers or metrics to show impact</li>
                      <li>Include more details about your specific accomplishments</li>
                    </ul>
                  </div>
                </div>)}

              {/* Follow-up Question */}
              {showFollowUp && followUpQuestion ? (<div className="card" style={{
                marginTop: '1.5rem',
                background: adaptiveMode === 'challenging' ? '#fee2e2' : (adaptiveMode === 'supportive' ? '#d1fae5' : '#dbeafe'),
                borderLeft: "4px solid ".concat(adaptiveMode === 'challenging' ? '#ef4444' : (adaptiveMode === 'supportive' ? '#10b981' : '#3b82f6'))
            }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>
                      {adaptiveMode === 'challenging' ? '😰' : (adaptiveMode === 'supportive' ? '😊' : '🎯')}
                    </span>
                    <h4 style={{ fontWeight: 700, color: '#1e293b', margin: 0 }}>
                      Follow-up Question
                    </h4>
                    <span style={{
                marginLeft: 'auto',
                background: '#7c3aed',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 600
            }}>
                      AI Generated
                    </span>
                  </div>
                  <p style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 500 }}>
                    {followUpQuestion}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.75rem' }}>
                    This is a context-aware follow-up based on your previous answer.
                  </p>
                  
                  <div style={{ marginTop: '1rem' }}>
                    <textarea className="input" value={followUpAnswer} onChange={function (e) { return setFollowUpAnswer(e.target.value); }} placeholder="Type your follow-up answer here..." rows={4} style={{ marginBottom: '0.75rem' }}/>
                    <button onClick={submitFollowUpAnswer} className="btn btn-primary" disabled={!followUpAnswer.trim()} style={{ width: '100%' }}>
                      Submit Follow-up Answer
                    </button>
                  </div>
                </div>) : null}
            </div>)}
        </div>
      </main>

      <SignLanguageAvatar isActive={signLanguageOn && !!session}/>
    </div>);
