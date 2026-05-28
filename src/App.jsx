import React, { useState, useEffect, useMemo } from 'react';
import { Zap } from 'lucide-react';
import './App.css';

// Import Refactored Modular Components from Subdirectories
import LoginForm from './components/LoginForm/LoginForm';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LessonCard from './components/LessonCard/LessonCard';
import LessonDetailView from './components/LessonDetailView/LessonDetailView';
import CreateModal from './components/CreateModal/CreateModal';
import CalendarModal from './components/CalendarModal/CalendarModal';

// Constants
const CLASSES = [
  "Playgroup (2-3 yrs)",
  "Nursery (3-4 yrs)",
  "LKG / Junior KG (4-5 yrs)",
  "UKG / Senior KG (5-6 yrs)"
];

const CATEGORIES = [
  { id: 'Science', label: '🧪 Science & Discovery' },
  { id: 'Art', label: '🎨 Arts & Crafts' },
  { id: 'Music', label: '🎵 Music & Dance' },
  { id: 'Reading', label: '📚 Reading & Phonics' },
  { id: 'Play', label: '🏃 Play & Physical' }
];

// Weekday sorting order (Monday through Sunday)
const WEEKDAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const INITIAL_LESSON_PLANS = [
  // --- FRIDAY MAY 22 ---
  {
    id: "seed-w4-f1",
    className: "Nursery (3-4 yrs)",
    topic: "Giant Bubble Parade 🫧",
    category: "Play",
    date: "2026-05-22",
    startTime: "09:00 AM",
    endTime: "09:45 AM",
    learningOutcome: "Strengthen physical coordination and capture floating bubbles.",
    materials: ["Bubble machine", "Bubble wands", "Soapy solution"],
    steps: ["Start the bubble machine in the yard.", "Have kids chase and pop bubbles.", "Perform bubble blowing contests."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-f2",
    className: "Nursery (3-4 yrs)",
    topic: "Paper Plate Lion Masks 🦁",
    category: "Art",
    date: "2026-05-22",
    startTime: "10:30 AM",
    endTime: "11:15 AM",
    learningOutcome: "Build fine motor skills by gluing and cutting paper mane.",
    materials: ["Paper plates", "Orange yarn", "Glue stick", "Safety scissors"],
    steps: ["Paint plates orange.", "Glue yarn strings around plates like lion mane.", "Draw nose and whiskers in the middle."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-f3",
    className: "Nursery (3-4 yrs)",
    topic: "Alphabet Phonics Picnic 🧺",
    category: "Reading",
    date: "2026-05-22",
    startTime: "01:30 PM",
    endTime: "02:15 PM",
    learningOutcome: "Sound out initial phonics letter B, P, and S.",
    materials: ["Felt board cards", "Mat", "Basket of toys"],
    steps: ["Invite kids onto the picnic mat.", "Pull out letters and make phonetic sounds.", "Match toys to letter cards."],
    completed: false,
    customImage: ""
  },

  // --- SATURDAY MAY 23 ---
  {
    id: "seed-w4-s1",
    className: "Nursery (3-4 yrs)",
    topic: "Weekend Garden Exploration 🦋",
    category: "Science",
    date: "2026-05-23",
    startTime: "09:00 AM",
    endTime: "09:45 AM",
    learningOutcome: "Identify fluttering butterflies, ladybugs, and local flora textures.",
    materials: ["Magnifying glasses", "Bug catcher nets", "Coloring clipboards"],
    steps: ["Take magnifying glasses into the school garden.", "Observe bugs and flora gently without touching.", "Color their favorite leaf textures on clipboards."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-s2",
    className: "Playgroup (2-3 yrs)",
    topic: "Jumbo Water-Bead Splashing 💦",
    category: "Play",
    date: "2026-05-23",
    startTime: "10:30 AM",
    endTime: "11:15 AM",
    learningOutcome: "Develop tactile hand reflexes and scooping motions.",
    materials: ["Sensory water tray", "Rainbow water-beads", "Plastic cups & spoons"],
    steps: ["Prepare sensory tray with hydrated water-beads.", "Give kids plastic cups to scoop beads.", "Sort water-beads by primary colors."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-s3",
    className: "UKG / Senior KG (5-6 yrs)",
    topic: "Paper Bag Puppet Theater 🎭",
    category: "Art",
    date: "2026-05-23",
    startTime: "01:30 PM",
    endTime: "02:15 PM",
    learningOutcome: "Foster character storytelling and creative vocal expressions.",
    materials: ["Brown paper bags", "Googly eyes", "Yarn mane", "Color markers"],
    steps: ["Glue googly eyes and yarn hair onto paper bags.", "Draw puppet mouths using color markers.", "Put on a mini cooperative story puppet show."],
    completed: false,
    customImage: ""
  },

  // --- SUNDAY MAY 24 ---
  {
    id: "seed-w4-u1",
    className: "LKG / Junior KG (4-5 yrs)",
    topic: "Baking Soda Volcano Eruptions 🌋",
    category: "Science",
    date: "2026-05-24",
    startTime: "09:30 AM",
    endTime: "10:15 AM",
    learningOutcome: "Observe carbon dioxide gas release chemical reactions.",
    materials: ["Baking soda", "Red food color vinegar", "Plastic bottles"],
    steps: ["Pack sand around plastic bottles on the outdoor tables.", "Pour baking soda and red coloring into the bottle.", "Add vinegar slowly and watch the colorful lava flow!"],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-u2",
    className: "UKG / Senior KG (5-6 yrs)",
    topic: "Sunday Gymnastics & Tumbling 🤸",
    category: "Play",
    date: "2026-05-24",
    startTime: "11:00 AM",
    endTime: "11:45 AM",
    learningOutcome: "Build physical balance, core strength, and tumble roll safety.",
    materials: ["Padded soft gym mats", "Colored hula hoops"],
    steps: ["Guide kids through light warm-up stretches.", "Practice forward tumble rolls on padded soft mats.", "Step through colored hula hoop pathway challenges."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-u3",
    className: "Nursery (3-4 yrs)",
    topic: "Nursery Rhyme Sing-Along Jam 🎤",
    category: "Music",
    date: "2026-05-24",
    startTime: "02:00 PM",
    endTime: "02:45 PM",
    learningOutcome: "Practice pitch synchronization and hand-clapping sync rhythms.",
    materials: ["Guitar or keyboard", "Hand-clappers", "Tambourines"],
    steps: ["Sit in a broad musical circle around the room.", "Sing classic nursery songs matching tempo controls.", "Tap tambourines and clappers on sound beats."],
    completed: false,
    customImage: ""
  },

  // --- MONDAY MAY 25 ---
  {
    id: "seed-w4-m1",
    className: "Playgroup (2-3 yrs)",
    topic: "Interactive Drum Rhythms 🥁",
    category: "Music",
    date: "2026-05-25",
    startTime: "09:00 AM",
    endTime: "09:30 AM",
    learningOutcome: "Understand steady tempos and rhythm beats.",
    materials: ["Toy hand drums", "Drumsticks", "Preschool songbook"],
    steps: ["Introduce drumming beats.", "Kids drum along with simple tempos.", "Play freeze drum game."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-m2",
    className: "Playgroup (2-3 yrs)",
    topic: "Shaving Cream Rain Clouds 🌧️",
    category: "Science",
    date: "2026-05-25",
    startTime: "10:15 AM",
    endTime: "11:00 AM",
    learningOutcome: "Observe chemical density and liquid mixing.",
    materials: ["Water cups", "Shaving cream", "Blue food coloring"],
    steps: ["Squirt shaving cream over water cups.", "Drip blue drops onto clouds.", "Watch color seep down like rain."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-m3",
    className: "Playgroup (2-3 yrs)",
    topic: "Sensory Sandbox Archaeology 🦖",
    category: "Play",
    date: "2026-05-25",
    startTime: "01:30 PM",
    endTime: "02:15 PM",
    learningOutcome: "Discover buried fossils using brushes and magnifying tools.",
    materials: ["Sensory sand table", "Plastic bones", "Excavator brushes"],
    steps: ["Bury dino bones in sandbox.", "Kids brush sand away to locate fossils.", "Sort dinos by size."],
    completed: true,
    customImage: ""
  },

  // --- TUESDAY MAY 26 ---
  {
    id: "seed-w4-t1",
    className: "LKG / Junior KG (4-5 yrs)",
    topic: "Alphabet Puzzle Animal Matching 🧩",
    category: "Reading",
    date: "2026-05-26",
    startTime: "09:00 AM",
    endTime: "09:45 AM",
    learningOutcome: "Recognize lowercase and uppercase letter links.",
    materials: ["Cardboard letter puzzles", "Animal cards"],
    steps: ["Spread puzzle pieces on floor.", "Match letter 'A' with 'Apple' or 'Ant' card.", "Complete the daily alphabet board."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-t2",
    className: "LKG / Junior KG (4-5 yrs)",
    topic: "Sensory Pasta Necklaces 📿",
    category: "Art",
    date: "2026-05-26",
    startTime: "10:30 AM",
    endTime: "11:15 AM",
    learningOutcome: "Practice needle threading fine hand coordination.",
    materials: ["Colored penne pasta", "Yarn string", "Blunt needles"],
    steps: ["Dye penne pasta in primary watercolors.", "Thread string through pasta pipes.", "Tie end to make necklaces."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-t3",
    className: "LKG / Junior KG (4-5 yrs)",
    topic: "Static Balloon Flying 🎈",
    category: "Science",
    date: "2026-05-26",
    startTime: "01:00 PM",
    endTime: "01:45 PM",
    learningOutcome: "Explore simple physics static electrical transfers.",
    materials: ["Rubber balloons", "Woolen cloth pieces", "Tissue shapes"],
    steps: ["Inflate colorful balloons.", "Rub balloon on wool cloth to generate charge.", "Pick up light tissue stars using static!"],
    completed: false,
    customImage: ""
  },

  // --- WEDNESDAY MAY 27 ---
  {
    id: "seed-w4-w1",
    className: "UKG / Senior KG (5-6 yrs)",
    topic: "Parachute Rainbow Waves 🌊",
    category: "Play",
    date: "2026-05-27",
    startTime: "09:00 AM",
    endTime: "09:30 AM",
    learningOutcome: "Coordinate physical waves in cooperation.",
    materials: ["Preschool parachute sheet", "Plastic balls"],
    steps: ["Hold parachute edges around circle.", "Create small ripples and large waves.", "Bounce plastic balls on sheet."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-w2",
    className: "UKG / Senior KG (5-6 yrs)",
    topic: "Kindergarten Shaker Jam 🎵",
    category: "Music",
    date: "2026-05-27",
    startTime: "10:15 AM",
    endTime: "11:00 AM",
    learningOutcome: "Imitate drumming song tempos and beats.",
    materials: ["Egg shakers", "Soundtracks"],
    steps: ["Pass out musical egg shakers.", "Shake to high and low speeds.", "Lead steady rhythms to nursery rhymes."],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-w3",
    className: "UKG / Senior KG (5-6 yrs)",
    topic: "Leaf Texture Painting 🍂",
    category: "Art",
    date: "2026-05-27",
    startTime: "01:30 PM",
    endTime: "02:15 PM",
    learningOutcome: "Capture raw leaf textures through stamp printing.",
    materials: ["Garden leaves", "Watercolor plates", "Paper sheet"],
    steps: ["Paint leaves using watercolors.", "Press leaves down on paper sheets.", "Peel back to reveal beautiful textures."],
    completed: false,
    customImage: ""
  },

  // --- THURSDAY MAY 28 (TODAY!) ---
  {
    id: "seed-w4-h1",
    className: "Nursery (3-4 yrs)",
    topic: "Rainbow Walking Water 🌈",
    category: "Science",
    date: "2026-05-28",
    startTime: "09:00 AM",
    endTime: "09:45 AM",
    learningOutcome: "Observe color blending travel through capillary flow.",
    materials: ["Plastic cups", "Food color", "Paper towel strips"],
    steps: ["Fill three cups with primary dyes.", "Bridge paper towels across cups.", "Watch colors crawl and mix in empty cups!"],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-h2",
    className: "Nursery (3-4 yrs)",
    topic: "Alphabet Sound Bingo 🎫",
    category: "Reading",
    date: "2026-05-28",
    startTime: "10:30 AM",
    endTime: "11:15 AM",
    learningOutcome: "Listen and match sounds to alphabet boards.",
    materials: ["Letter bingo sheets", "Chips", "Caller cards"],
    steps: ["Distribute alphabet cards.", "Call phonetic letter sounds.", "Place chips on matching slots to win!"],
    completed: false,
    customImage: ""
  },
  {
    id: "seed-w4-h3",
    className: "Nursery (3-4 yrs)",
    topic: "Bedtime Story & Constellations 🌟",
    category: "Play",
    date: "2026-05-28",
    startTime: "09:00 PM",
    endTime: "09:50 PM",
    learningOutcome: "Explore outer-space constellations using projections.",
    materials: ["Star projector", "Constellation charts"],
    steps: ["Turn off classroom lights.", "Turn on star nightlight projector on ceiling.", "Trace shapes of stars on ceiling mapping."],
    completed: false,
    customImage: ""
  }
];

export default function App() {
  // --------------------------------------------------------------------------
  // 1. STATE & STORAGE
  // --------------------------------------------------------------------------
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('preschool_teacher_profile');
    return saved ? JSON.parse(saved) : { isLoggedIn: false, name: '', class: CLASSES[1] };
  });

  const [lessons, setLessons] = useState(() => {
    const saved = localStorage.getItem('preschool_lesson_plans');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Force sync to load new seed lessons in Week 4 if they aren't pre-saved!
      if (!parsed.some(l => l.id === 'seed-w4-s1')) {
        return INITIAL_LESSON_PLANS;
      }
      return parsed;
    }
    return INITIAL_LESSON_PLANS;
  });

  const [activeClassFilter, setActiveClassFilter] = useState('All Classes');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [confetti, setConfetti] = useState([]);

  // Form State
  const [newPlan, setNewPlan] = useState({
    className: CLASSES[0],
    topic: '',
    category: 'Science',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '09:45',
    learningOutcome: '',
    materialsInput: '',
    steps: [], // Default to empty array - steps are fully optional!
    imageFile: ''
  });

  // n8n Webhook settings state
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState(() => {
    const saved = localStorage.getItem('preschool_n8n_webhook');
    // Force set the correct production URL if cache is empty, old, or pointing to a test webhook
    if (!saved || saved.trim() === '' || saved.includes('/webhook-test/') || saved.includes('lify-lignis')) {
      return 'https://iify-iignis-0.app.n8n.cloud/webhook/generate-full-lesson';
    }
    return saved;
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPreviewData, setAiPreviewData] = useState(null);
  const [isAiModeOnly, setIsAiModeOnly] = useState(false);

  // --------------------------------------------------------------------------
  // 2. EFFECTS
  // --------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem('preschool_teacher_profile', JSON.stringify(profile));
    if (profile.isLoggedIn && activeClassFilter === 'All Classes') {
      setActiveClassFilter(profile.class);
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('preschool_lesson_plans', JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem('preschool_n8n_webhook', n8nWebhookUrl);
  }, [n8nWebhookUrl]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --------------------------------------------------------------------------
  // 3. ANCILLARY HANDLERS (WEEKS & CONFETTI)
  // --------------------------------------------------------------------------
  const triggerConfetti = () => {
    const particles = [];
    const colors = ['#E2B007', '#0284C7', '#059669', '#DC2626', '#8B5CF6', '#F59E0B', '#3B82F6'];
    for (let i = 0; i < 60; i++) {
      particles.push({
        id: `c-${i}-${Date.now()}`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        size: `${Math.random() * 8 + 5}px`,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: `${Math.random() * 360}deg`
      });
    }
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 4500);
  };

  const TERM_START_DATE = '2026-05-01';

  const getWeekNumber = (dateStr) => {
    const date = new Date(dateStr);
    const start = new Date(TERM_START_DATE);
    const diff = date - start;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 1;
    return Math.floor(diffDays / 7) + 1;
  };

  const formatDateFriendly = (dateStr) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  // --------------------------------------------------------------------------
  // 4. MEMOIZED FILTER & PROGRESS CALCULATORS
  // --------------------------------------------------------------------------
  const filteredLessons = useMemo(() => {
    let list = lessons;
    if (activeClassFilter !== 'All Classes') {
      list = lessons.filter(l => l.className === activeClassFilter);
    }
    return [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [lessons, activeClassFilter]);

  // Group lessons by Week AND Day of the week (avoids empty spaces)
  const groupedLessons = useMemo(() => {
    const groups = {};
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    filteredLessons.forEach(lesson => {
      const week = getWeekNumber(lesson.date);
      const weekLabel = `Week ${week}`;
      
      const dateObj = new Date(lesson.date + "T00:00:00");
      const dayName = days[dateObj.getDay()];
      
      if (!groups[weekLabel]) {
        groups[weekLabel] = {};
      }
      if (!groups[weekLabel][dayName]) {
        groups[weekLabel][dayName] = [];
      }
      groups[weekLabel][dayName].push(lesson);
    });
    return groups;
  }, [filteredLessons]);

  const stats = useMemo(() => {
    const classLessons = activeClassFilter === 'All Classes' 
      ? lessons 
      : lessons.filter(l => l.className === activeClassFilter);
    
    const total = classLessons.length;
    const completed = classLessons.filter(l => l.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, percentage };
  }, [lessons, activeClassFilter]);

  // --------------------------------------------------------------------------
  // 5. EVENT CONTROLLERS
  // --------------------------------------------------------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    if (!profile.name.trim()) return;
    setProfile(prev => ({ ...prev, isLoggedIn: true }));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out? Your lesson plans will remain saved!")) {
      setProfile({ isLoggedIn: false, name: '', class: CLASSES[1] });
      setActiveClassFilter('All Classes');
    }
  };

  const toggleComplete = (id, e) => {
    if (e) e.stopPropagation();
    
    setLessons(prev => prev.map(lesson => {
      if (lesson.id === id) {
        const nextState = !lesson.completed;
        if (nextState) {
          triggerConfetti();
        }
        
        if (selectedLesson && selectedLesson.id === id) {
          setSelectedLesson(curr => ({ ...curr, completed: nextState }));
        }
        
        return { ...lesson, completed: nextState };
      }
      return lesson;
    }));
  };

  const handleDeletePlan = (id, e) => {
    if (e) e.stopPropagation();
    setLessons(prev => prev.filter(lesson => lesson.id !== id));
    if (selectedLesson && selectedLesson.id === id) {
      setSelectedLesson(null);
    }
  };

  const checkTimeConflict = (date, startStr, endStr, excludeId = null) => {
    const newStart = parseLessonTime(date, formatTimeInput(startStr));
    const newEnd = parseLessonTime(date, formatTimeInput(endStr));
    
    // 1. Check if start time is behind end time
    if (newStart >= newEnd) {
      return { conflict: true, message: "⚠️ Invalid Time: The Start Time must be earlier than the End Time!" };
    }
    
    // 2. Check for overlaps with existing lessons on the same date
    const sameDayLessons = lessons.filter(l => l.date === date && l.id !== excludeId);
    
    for (let lesson of sameDayLessons) {
      const existStart = parseLessonTime(lesson.date, lesson.startTime);
      const existEnd = parseLessonTime(lesson.date, lesson.endTime);
      
      // Overlap condition: (newStart < existEnd) && (newEnd > existStart)
      if (newStart < existEnd && newEnd > existStart) {
        return { 
          conflict: true, 
          message: `⚠️ Time Conflict: "${lesson.topic}" is already scheduled from ${lesson.startTime} to ${lesson.endTime} on this day! Please select a different time.` 
        };
      }
    }
    
    return { conflict: false };
  };

  const handleN8nGeneration = async (customPromptDetails = "") => {
    if (!newPlan.topic.trim()) {
      alert("⚠️ Please enter a playful topic name first!");
      return;
    }
    
    if (!n8nWebhookUrl.trim()) {
      alert("⚠️ Please enter your n8n Webhook URL first in the generator settings box!");
      return;
    }

    // Check for timeline conflicts BEFORE querying n8n
    const conflictCheck = checkTimeConflict(newPlan.date, newPlan.startTime, newPlan.endTime);
    if (conflictCheck.conflict) {
      alert(conflictCheck.message);
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          className: newPlan.className,
          topic: newPlan.topic,
          category: newPlan.category,
          date: newPlan.date,
          startTime: formatTimeInput(newPlan.startTime),
          endTime: formatTimeInput(newPlan.endTime),
          learningOutcome: newPlan.learningOutcome,
          materials: newPlan.materialsInput,
          promptDetails: customPromptDetails
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Map response to lesson fields
      const finalCategory = data.category || newPlan.category || 'Science';
      const finalTopic = data.topic || newPlan.topic;
      const finalOutcome = data.learningOutcome || "Observe and play together.";
      
      let finalMaterials = ["Standard classroom items"];
      if (data.materials && Array.isArray(data.materials)) {
        finalMaterials = data.materials;
      } else if (data.materials && typeof data.materials === 'string') {
        finalMaterials = data.materials.split(',').map(m => m.trim()).filter(m => m.length > 0);
      } else if (newPlan.materialsInput) {
        finalMaterials = newPlan.materialsInput.split(',').map(m => m.trim()).filter(m => m.length > 0);
      }
      
      let finalSteps = [];
      if (data.steps && Array.isArray(data.steps)) {
        finalSteps = data.steps;
      } else if (data.steps && typeof data.steps === 'string') {
        finalSteps = data.steps.split('\n').map(s => s.trim()).filter(s => s.length > 0);
      }
      
      const previewData = {
        className: newPlan.className,
        topic: finalTopic,
        category: finalCategory,
        date: newPlan.date,
        startTime: newPlan.startTime,
        endTime: newPlan.endTime,
        learningOutcome: finalOutcome,
        materials: finalMaterials,
        steps: finalSteps
      };
      
      setAiPreviewData(previewData);
      triggerConfetti();
      alert("✨ n8n AI successfully drafted your curriculum! Review the card preview in the modal.");
    } catch (error) {
      console.error("n8n Generation failed:", error);
      alert(`❌ n8n Generation failed: ${error.message}.\n\nPlease ensure your n8n workflow is active, you are using the correct production webhook URL (not the test one if calling cross-origin), and "Respond with CORS Headers" options are enabled inside n8n node settings!`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirmAiPlan = () => {
    if (!aiPreviewData) return;
    
    const conflictCheck = checkTimeConflict(
      aiPreviewData.date, 
      aiPreviewData.startTime, 
      aiPreviewData.endTime
    );
    if (conflictCheck.conflict) {
      alert(conflictCheck.message);
      return;
    }
    
    const newlyCreated = {
      id: `lesson-n8n-${Date.now()}`,
      className: aiPreviewData.className,
      topic: aiPreviewData.topic,
      category: aiPreviewData.category,
      date: aiPreviewData.date,
      startTime: formatTimeInput(aiPreviewData.startTime),
      endTime: formatTimeInput(aiPreviewData.endTime),
      learningOutcome: aiPreviewData.learningOutcome,
      materials: aiPreviewData.materials,
      steps: aiPreviewData.steps,
      completed: false,
      customImage: ''
    };
    
    setLessons(prev => [newlyCreated, ...prev]);
    setAiPreviewData(null);
    setIsModalOpen(false);
    
    // Reset plan form states
    setNewPlan({
      className: profile.class || CLASSES[0],
      topic: '',
      category: 'Science',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '09:45',
      learningOutcome: '',
      materialsInput: '',
      steps: [],
      imageFile: ''
    });
    
    triggerConfetti();
  };

  const handleEditAiPlan = () => {
    if (!aiPreviewData) return;
    
    setNewPlan({
      className: aiPreviewData.className,
      topic: aiPreviewData.topic,
      category: aiPreviewData.category,
      date: aiPreviewData.date,
      startTime: aiPreviewData.startTime,
      endTime: aiPreviewData.endTime,
      learningOutcome: aiPreviewData.learningOutcome,
      materialsInput: aiPreviewData.materials.join(', '),
      steps: aiPreviewData.steps,
      imageFile: ''
    });
    
    setAiPreviewData(null);
    setIsAiModeOnly(false); // Enable manual editing of the generated fields!
  };

  const parseLessonTime = (dateStr, timeStr) => {
    const [time, ampm] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    const m = parseInt(minutes);
    if (ampm === 'PM' && h < 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    
    const d = new Date(dateStr + "T00:00:00");
    d.setHours(h, m, 0);
    return d;
  };

  const findCurrentLesson = () => {
    const now = currentTime;
    const todayStr = now.toISOString().split('T')[0];
    const todayLessons = lessons.filter(l => l.date === todayStr);
    
    const happeningNow = todayLessons.find(l => {
      const start = parseLessonTime(l.date, l.startTime);
      const end = parseLessonTime(l.date, l.endTime);
      return now >= start && now <= end;
    });
    
    if (happeningNow) return happeningNow;
    
    const upcomingToday = todayLessons
      .filter(l => {
        const start = parseLessonTime(l.date, l.startTime);
        return start > now;
      })
      .sort((a, b) => {
        const startA = parseLessonTime(a.date, a.startTime);
        const startB = parseLessonTime(b.date, b.startTime);
        return startA - startB;
      });
      
    if (upcomingToday.length > 0) return upcomingToday[0];
    
    const futureLessons = lessons
      .filter(l => new Date(l.date + "T00:00:00") >= new Date(todayStr + "T00:00:00"))
      .filter(l => {
        const start = parseLessonTime(l.date, l.startTime);
        return start > now;
      })
      .sort((a, b) => {
        const startA = parseLessonTime(a.date, a.startTime);
        const startB = parseLessonTime(b.date, b.startTime);
        return startA - startB;
      });
      
    if (futureLessons.length > 0) return futureLessons[0];
    
    return null;
  };

  const handleGoToCurrent = () => {
    const active = findCurrentLesson();
    if (active) {
      setSelectedLesson(active);
      triggerConfetti();
    } else {
      alert("☕ No lessons are scheduled right now or in the near future! Relax and enjoy a break.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPlan(prev => ({ ...prev, imageFile: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...newPlan.steps];
    newSteps[index] = value;
    setNewPlan(prev => ({ ...prev, steps: newSteps }));
  };

  const addStepField = () => {
    setNewPlan(prev => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  const removeStepField = (index) => {
    const newSteps = newPlan.steps.filter((_, i) => i !== index);
    setNewPlan(prev => ({ ...prev, steps: newSteps }));
  };

  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!newPlan.topic.trim()) return;

    // Check for timeline conflicts
    const conflictCheck = checkTimeConflict(newPlan.date, newPlan.startTime, newPlan.endTime);
    if (conflictCheck.conflict) {
      alert(conflictCheck.message);
      return;
    }

    const materialsArray = newPlan.materialsInput
      ? newPlan.materialsInput.split(',').map(m => m.trim()).filter(m => m.length > 0)
      : [];

    const cleanedSteps = newPlan.steps.map(s => s.trim()).filter(s => s.length > 0);

    const newlyCreated = {
      id: `lesson-${Date.now()}`,
      className: newPlan.className,
      topic: newPlan.topic,
      category: newPlan.category,
      date: newPlan.date,
      startTime: formatTimeInput(newPlan.startTime),
      endTime: formatTimeInput(newPlan.endTime),
      learningOutcome: newPlan.learningOutcome || "Observe and play together.",
      materials: materialsArray.length > 0 ? materialsArray : ["Standard classroom items"],
      steps: cleanedSteps,
      completed: false,
      customImage: newPlan.imageFile
    };

    setLessons(prev => [newlyCreated, ...prev]);
    setIsModalOpen(false);

    setNewPlan({
      className: profile.class || CLASSES[0],
      topic: '',
      category: 'Science',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '09:45',
      learningOutcome: '',
      materialsInput: '',
      steps: [],
      imageFile: ''
    });

    triggerConfetti();
  };

  const formatTimeInput = (timeStr) => {
    if (!timeStr) return '';
    if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
    const [hours, minutes] = timeStr.split(':');
    let h = parseInt(hours);
    const m = minutes || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    const formattedHour = h < 10 ? `0${h}` : h;
    return `${formattedHour}:${m} ${ampm}`;
  };

  // --------------------------------------------------------------------------
  // 6. WORKSPACE RENDER
  // --------------------------------------------------------------------------
  if (!profile.isLoggedIn) {
    return (
      <LoginForm 
        profile={profile} 
        setProfile={setProfile} 
        onLogin={handleLogin} 
        CLASSES={CLASSES} 
      />
    );
  }

  const activeLesson = findCurrentLesson();

  return (
    <div className="app-container">
      
      {/* Confetti Celebration Overlay */}
      {confetti.length > 0 && (
        <div className="confetti-layer">
          {confetti.map(p => (
            <div 
              key={p.id}
              className="confetti-piece"
              style={{
                left: p.left,
                animationDelay: p.delay,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                transform: `rotate(${p.rotation})`
              }}
            />
          ))}
        </div>
      )}

      {/* Header Sticky Component */}
      <Header currentTime={currentTime} />

      {/* Main Grid split layout */}
      <main className="main-layout">
        
        {/* Left column (Cohesive dashboard sidebar container) */}
        <Sidebar 
          profile={profile} 
          onLogout={handleLogout} 
          activeClassFilter={activeClassFilter} 
          setActiveClassFilter={setActiveClassFilter} 
          stats={stats} 
          onOpenCreate={() => {
            setIsAiModeOnly(false);
            setIsModalOpen(true);
          }} 
          onOpenCalendar={() => setIsCalendarOpen(true)}
          onGoToCurrent={handleGoToCurrent}
          onOpenAiCreate={() => {
            setIsAiModeOnly(true);
            setIsModalOpen(true);
          }}
          CLASSES={CLASSES} 
        />

        {/* Right column (Chronological weekly and daily organized flash cards grid) */}
        <section className="planner-feed">
          
          {/* Active Lesson Quick Jump Banner */}
          {activeLesson && (
            <div className="active-lesson-quick-jump-banner">
              <div className="banner-left-meta">
                <div className="banner-live-badge">
                  <span className="live-dot"></span>
                  LIVE CLASS HAPPENING NOW
                </div>
                <div className="banner-lesson-info">
                  <h4 className="banner-lesson-topic">{activeLesson.topic}</h4>
                  <p className="banner-lesson-times">
                    <span>⏱️ {activeLesson.startTime} - {activeLesson.endTime}</span>
                    <span className="banner-divider">|</span>
                    <span>🎒 {activeLesson.className}</span>
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                className="banner-jump-button"
                onClick={() => {
                  setSelectedLesson(activeLesson);
                  triggerConfetti();
                }}
                title="Jump to details and start teaching this class!"
              >
                <span>Start Teaching</span>
                <Zap size={16} fill="currentColor" />
              </button>
            </div>
          )}

          {Object.keys(groupedLessons).length === 0 ? (
            <div className="empty-feed-card">
              <div className="empty-icon-box">🎒</div>
              <h4>No Lesson Plans Scheduled</h4>
              <p>Select another classroom from your dashboard sidebar or create a new lesson plan to begin!</p>
            </div>
          ) : (
            Object.keys(groupedLessons).sort().map((weekKey) => (
              <div key={weekKey} className="week-section">
                
                {/* 1. Week Section title */}
                <div className="week-title-badge">
                  <span>{weekKey}</span>
                </div>
                
                {/* 2. Organized Day list under this week */}
                <div className="week-days-container">
                  {WEEKDAY_ORDER.filter(dayName => groupedLessons[weekKey][dayName]).map(dayName => (
                    <div key={dayName} className="day-group">
                      
                      {/* Day Label Subtitle (minimizes spaces, hides empty days) */}
                      <h4 className="day-group-title">
                        <span>☀️ {dayName}</span>
                      </h4>
                      
                      {/* Day Cards Grid */}
                      <div className="week-cards-grid">
                        {groupedLessons[weekKey][dayName].map((lesson) => (
                          <LessonCard 
                            key={lesson.id} 
                            lesson={lesson} 
                            onSelect={setSelectedLesson} 
                            onToggleComplete={toggleComplete} 
                            onDelete={handleDeletePlan} 
                            formatDateFriendly={formatDateFriendly} 
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))
          )}
        </section>

      </main>

      {/* Add New Lesson Plan Modal */}
      <CreateModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setIsAiModeOnly(false);
        }} 
        isAiModeOnly={isAiModeOnly}
        newPlan={newPlan} 
        setNewPlan={setNewPlan} 
        onCreate={handleCreatePlan} 
        CLASSES={CLASSES} 
        CATEGORIES={CATEGORIES} 
        handleStepChange={handleStepChange} 
        addStepField={addStepField} 
        removeStepField={removeStepField} 
        handleImageUpload={handleImageUpload} 
        n8nWebhookUrl={n8nWebhookUrl}
        setN8nWebhookUrl={setN8nWebhookUrl}
        isGenerating={isGenerating}
        onGenerateN8n={handleN8nGeneration}
        aiPreviewData={aiPreviewData}
        setAiPreviewData={setAiPreviewData}
        onConfirmAiPlan={handleConfirmAiPlan}
        onEditAiPlan={handleEditAiPlan}
      />

      {/* Full-screen storybook detailed page */}
      {selectedLesson && (
        <LessonDetailView 
          lesson={selectedLesson} 
          onClose={() => setSelectedLesson(null)} 
          onToggleComplete={toggleComplete} 
          onDelete={handleDeletePlan} 
          formatDateFriendly={formatDateFriendly} 
        />
      )}

      {/* Term Calendar overlay */}
      <CalendarModal 
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        lessons={lessons}
        onSelectLesson={(lesson) => {
          setSelectedLesson(lesson);
          setIsCalendarOpen(false);
        }}
        formatDateFriendly={formatDateFriendly}
      />

    </div>
  );
}
