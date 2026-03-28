import { addDays, subDays, startOfWeek, addHours, format } from "date-fns";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  code: string;
  color: string;
  progress: number;
  chaptersCount: number;
  flashcardsCount: number;
  questionsCount: number;
  lastAccessed: string;
  description: string;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  order: number;
  content: string;
  isProcessed: boolean;
}

export interface Flashcard {
  id: string;
  courseId: string;
  chapterId: string;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
  nextReview: string;
  interval: number;
  easeFactor: number;
}

export interface Question {
  id: string;
  courseId: string;
  chapterId: string;
  type: "mcq" | "analytical" | "short-answer";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface KanbanTask {
  id: string;
  courseId: string;
  title: string;
  description: string;
  status: "backlog" | "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  tags: string[];
}

export interface ScheduleEvent {
  id: string;
  courseId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: "study" | "review" | "exam" | "missed";
  isRescheduled: boolean;
}

export interface VisualAsset {
  id: string;
  courseId: string;
  chapterId: string;
  title: string;
  description: string;
  status: "generating" | "reviewing" | "approved" | "rejected";
  iterationCount: number;
}

export interface ProcessingStep {
  id: string;
  name: string;
  icon: string;
  status: "pending" | "processing" | "completed" | "failed";
  description: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  university: string;
  major: string;
  totalStudyHours: number;
  streakDays: number;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const today = new Date();

export const user: UserProfile = {
  name: "Haitham",
  email: "haitham@university.edu",
  avatar: "H",
  university: "King Saud University",
  major: "Computer Science",
  totalStudyHours: 247,
  streakDays: 12,
};

const courseColors = [
  "from-violet-500/20 to-purple-600/20",
  "from-cyan-500/20 to-blue-600/20",
  "from-rose-500/20 to-pink-600/20",
  "from-amber-500/20 to-orange-600/20",
  "from-emerald-500/20 to-green-600/20",
];

const courseAccents = [
  "text-violet-400",
  "text-cyan-400",
  "text-rose-400",
  "text-amber-400",
  "text-emerald-400",
];

const courseBorders = [
  "border-violet-500/30",
  "border-cyan-500/30",
  "border-rose-500/30",
  "border-amber-500/30",
  "border-emerald-500/30",
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Data Structures & Algorithms",
    code: "CS 201",
    color: courseColors[0],
    progress: 72,
    chaptersCount: 12,
    flashcardsCount: 86,
    questionsCount: 45,
    lastAccessed: "2 hours ago",
    description:
      "Fundamental data structures including arrays, linked lists, trees, graphs, and algorithm design paradigms.",
  },
  {
    id: "2",
    title: "Operating Systems",
    code: "CS 340",
    color: courseColors[1],
    progress: 45,
    chaptersCount: 8,
    flashcardsCount: 52,
    questionsCount: 30,
    lastAccessed: "Yesterday",
    description:
      "Process management, memory allocation, file systems, and concurrency in modern operating systems.",
  },
  {
    id: "3",
    title: "Machine Learning",
    code: "CS 470",
    color: courseColors[2],
    progress: 30,
    chaptersCount: 15,
    flashcardsCount: 120,
    questionsCount: 60,
    lastAccessed: "3 days ago",
    description:
      "Supervised and unsupervised learning, neural networks, ensemble methods, and model evaluation.",
  },
  {
    id: "4",
    title: "Database Systems",
    code: "CS 310",
    color: courseColors[3],
    progress: 88,
    chaptersCount: 10,
    flashcardsCount: 64,
    questionsCount: 35,
    lastAccessed: "5 hours ago",
    description:
      "Relational model, SQL, normalization, transaction processing, and query optimization.",
  },
  {
    id: "5",
    title: "Computer Networks",
    code: "CS 350",
    color: courseColors[4],
    progress: 15,
    chaptersCount: 9,
    flashcardsCount: 40,
    questionsCount: 25,
    lastAccessed: "1 week ago",
    description:
      "OSI model, TCP/IP, routing protocols, network security, and distributed systems fundamentals.",
  },
];

export function getCourseAccent(index: number) {
  return courseAccents[index % courseAccents.length];
}

export function getCourseBorder(index: number) {
  return courseBorders[index % courseBorders.length];
}

export const chapters: Chapter[] = [
  {
    id: "ch1",
    courseId: "1",
    title: "Introduction to Complexity Analysis",
    order: 1,
    isProcessed: true,
    content: `## Big-O Notation & Complexity Analysis

Understanding algorithm efficiency is the cornerstone of computer science. We measure performance using **asymptotic notation**.

### Key Concepts

- **Big-O (O)**: Upper bound — worst-case scenario
- **Big-Ω (Omega)**: Lower bound — best-case scenario  
- **Big-Θ (Theta)**: Tight bound — average-case scenario

### Common Complexities (Fastest → Slowest)

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Array access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Bubble sort |
| O(2ⁿ) | Exponential | Recursive Fibonacci |

### The Master Theorem

For recurrences of the form: **T(n) = aT(n/b) + f(n)**

This powerful tool lets us determine the time complexity of divide-and-conquer algorithms without solving the full recurrence.

> 💡 **Key Insight**: Always analyze both time AND space complexity. An O(n) time algorithm with O(n) space might be worse than an O(n log n) time algorithm with O(1) space, depending on constraints.`,
  },
  {
    id: "ch2",
    courseId: "1",
    title: "Arrays & Linked Lists",
    order: 2,
    isProcessed: true,
    content: `## Arrays vs Linked Lists

Two fundamental ways to store sequential data, each with distinct trade-offs.

### Arrays
- **Random access**: O(1) — jump directly to any index
- **Insertion/Deletion**: O(n) — must shift elements
- **Memory**: Contiguous block, cache-friendly

### Linked Lists
- **Access**: O(n) — must traverse from head
- **Insertion/Deletion**: O(1) — just update pointers
- **Memory**: Non-contiguous, each node stores a pointer

### When to Use What?

Use **Arrays** when you need fast random access and know the size upfront.
Use **Linked Lists** when you have frequent insertions/deletions and don't need random access.

> 🧠 **Pro Tip**: In practice, arrays almost always outperform linked lists due to CPU cache locality. Modern processors love sequential memory access.`,
  },
  {
    id: "ch3",
    courseId: "1",
    title: "Trees & Binary Search Trees",
    order: 3,
    isProcessed: true,
    content: `## Tree Data Structures

Hierarchical data structures that model relationships with parent-child nodes.

### Binary Search Tree (BST)
- Left child < Parent < Right child
- Average case: O(log n) for search, insert, delete
- Worst case (skewed): O(n)

### AVL Trees
Self-balancing BST that maintains height difference ≤ 1 between subtrees.

### Red-Black Trees
Another self-balancing BST used in most standard library implementations (e.g., Java TreeMap, C++ std::map).`,
  },
  {
    id: "ch4",
    courseId: "1",
    title: "Graph Algorithms",
    order: 4,
    isProcessed: false,
    content: "",
  },
];

export const flashcards: Flashcard[] = [
  {
    id: "fc1",
    courseId: "1",
    chapterId: "ch1",
    front: "What is the time complexity of binary search?",
    back: "O(log n) — Binary search halves the search space with each comparison, requiring at most log₂(n) comparisons.",
    difficulty: "easy",
    nextReview: format(addDays(today, 1), "yyyy-MM-dd"),
    interval: 1,
    easeFactor: 2.5,
  },
  {
    id: "fc2",
    courseId: "1",
    chapterId: "ch1",
    front: "Explain the Master Theorem and when it applies.",
    back: "The Master Theorem solves recurrences of the form T(n) = aT(n/b) + f(n). It has 3 cases based on comparing f(n) with n^(log_b(a)). It applies to divide-and-conquer algorithms where subproblems are of equal size.",
    difficulty: "hard",
    nextReview: format(today, "yyyy-MM-dd"),
    interval: 0,
    easeFactor: 2.1,
  },
  {
    id: "fc3",
    courseId: "1",
    chapterId: "ch2",
    front: "Why do arrays often outperform linked lists in practice?",
    back: "CPU cache locality. Arrays store elements contiguously in memory, so when one element is loaded into cache, nearby elements come with it. Linked list nodes are scattered in memory, causing frequent cache misses.",
    difficulty: "medium",
    nextReview: format(addDays(today, 3), "yyyy-MM-dd"),
    interval: 3,
    easeFactor: 2.3,
  },
  {
    id: "fc4",
    courseId: "1",
    chapterId: "ch2",
    front: "What is the time complexity of inserting at the beginning of a linked list vs an array?",
    back: "Linked List: O(1) — just update the head pointer. Array: O(n) — must shift all existing elements to the right.",
    difficulty: "easy",
    nextReview: format(addDays(today, 5), "yyyy-MM-dd"),
    interval: 5,
    easeFactor: 2.6,
  },
  {
    id: "fc5",
    courseId: "1",
    chapterId: "ch3",
    front: "What is the difference between an AVL tree and a Red-Black tree?",
    back: "Both are self-balancing BSTs. AVL trees are more strictly balanced (height diff ≤ 1), giving faster lookups. Red-Black trees are less strictly balanced but have faster insertions/deletions due to fewer rotations.",
    difficulty: "hard",
    nextReview: format(addDays(today, 2), "yyyy-MM-dd"),
    interval: 2,
    easeFactor: 2.0,
  },
  {
    id: "fc6",
    courseId: "2",
    chapterId: "ch1",
    front: "What is a process vs a thread?",
    back: "A process is an independent execution unit with its own memory space. A thread is a lightweight unit within a process that shares the process's memory. Threads are cheaper to create and switch between.",
    difficulty: "medium",
    nextReview: format(addDays(today, 1), "yyyy-MM-dd"),
    interval: 1,
    easeFactor: 2.4,
  },
];

export const questions: Question[] = [
  {
    id: "q1",
    courseId: "1",
    chapterId: "ch1",
    type: "mcq",
    question: "What is the time complexity of accessing an element in a hash table with a good hash function?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(1)",
    explanation:
      "A good hash function distributes keys uniformly, so on average, we can access any element in constant time O(1). Worst case (all collisions) is O(n).",
  },
  {
    id: "q2",
    courseId: "1",
    chapterId: "ch1",
    type: "mcq",
    question: "Which sorting algorithm has the best worst-case time complexity?",
    options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Selection Sort"],
    correctAnswer: "Merge Sort",
    explanation:
      "Merge Sort guarantees O(n log n) in all cases (best, average, worst). Quick Sort is O(n²) worst case, though O(n log n) on average.",
  },
  {
    id: "q3",
    courseId: "1",
    chapterId: "ch2",
    type: "analytical",
    question:
      "You need to design a data structure that supports O(1) insertion at both ends and O(1) deletion at both ends, but O(n) random access is acceptable. Which data structure would you choose and why?",
    correctAnswer:
      "A doubly linked list (or deque implemented with a doubly linked list). It maintains pointers to both head and tail, allowing O(1) insertion and deletion at both ends. Random access requires traversal, which is O(n), but this is acceptable per the requirements.",
    explanation:
      "This question tests understanding of data structure trade-offs. A deque (double-ended queue) is the ideal abstraction, and a doubly linked list is the natural implementation.",
  },
  {
    id: "q4",
    courseId: "1",
    chapterId: "ch3",
    type: "short-answer",
    question: "What property must a Binary Search Tree maintain for all nodes?",
    correctAnswer:
      "For every node, all values in the left subtree must be less than the node's value, and all values in the right subtree must be greater than the node's value.",
    explanation:
      "This is the BST invariant. It enables efficient search by eliminating half the tree at each step, similar to binary search on a sorted array.",
  },
];

export const kanbanTasks: KanbanTask[] = [
  {
    id: "kt1",
    courseId: "1",
    title: "Review Binary Trees",
    description: "Go through chapter 3 flashcards and practice tree traversal problems",
    status: "done",
    priority: "high",
    dueDate: format(subDays(today, 1), "yyyy-MM-dd"),
    tags: ["CS 201", "Trees"],
  },
  {
    id: "kt2",
    courseId: "1",
    title: "Graph Algorithms Quiz Prep",
    description: "Study BFS, DFS, Dijkstra's and practice on LeetCode",
    status: "in-progress",
    priority: "high",
    dueDate: format(addDays(today, 2), "yyyy-MM-dd"),
    tags: ["CS 201", "Graphs"],
  },
  {
    id: "kt3",
    courseId: "2",
    title: "OS Midterm Review",
    description: "Review process scheduling, deadlocks, and memory management",
    status: "todo",
    priority: "high",
    dueDate: format(addDays(today, 5), "yyyy-MM-dd"),
    tags: ["CS 340", "Exam"],
  },
  {
    id: "kt4",
    courseId: "3",
    title: "ML Assignment #3",
    description: "Implement gradient descent for linear regression from scratch",
    status: "todo",
    priority: "medium",
    dueDate: format(addDays(today, 7), "yyyy-MM-dd"),
    tags: ["CS 470", "Assignment"],
  },
  {
    id: "kt5",
    courseId: "4",
    title: "SQL Practice Problems",
    description: "Complete 10 advanced SQL query exercises on joins and subqueries",
    status: "in-progress",
    priority: "medium",
    dueDate: format(addDays(today, 3), "yyyy-MM-dd"),
    tags: ["CS 310", "Practice"],
  },
  {
    id: "kt6",
    courseId: "5",
    title: "Network Lab Report",
    description: "Write up findings from Wireshark packet analysis lab",
    status: "backlog",
    priority: "low",
    dueDate: format(addDays(today, 14), "yyyy-MM-dd"),
    tags: ["CS 350", "Lab"],
  },
  {
    id: "kt7",
    courseId: "1",
    title: "Complexity Analysis Flashcards",
    description: "Review all Big-O notation flashcards using spaced repetition",
    status: "done",
    priority: "medium",
    dueDate: format(subDays(today, 3), "yyyy-MM-dd"),
    tags: ["CS 201", "Flashcards"],
  },
  {
    id: "kt8",
    courseId: "3",
    title: "Read Neural Networks Chapter",
    description: "Study feedforward networks, backpropagation, activation functions",
    status: "backlog",
    priority: "medium",
    dueDate: format(addDays(today, 10), "yyyy-MM-dd"),
    tags: ["CS 470", "Reading"],
  },
];

const weekStart = startOfWeek(today, { weekStartsOn: 0 });

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: "se1",
    courseId: "1",
    title: "DSA Study Session",
    date: format(addDays(weekStart, 1), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "11:00",
    type: "study",
    isRescheduled: false,
  },
  {
    id: "se2",
    courseId: "2",
    title: "OS Review",
    date: format(addDays(weekStart, 1), "yyyy-MM-dd"),
    startTime: "14:00",
    endTime: "15:30",
    type: "review",
    isRescheduled: false,
  },
  {
    id: "se3",
    courseId: "3",
    title: "ML Lecture Review",
    date: format(addDays(weekStart, 2), "yyyy-MM-dd"),
    startTime: "10:00",
    endTime: "12:00",
    type: "study",
    isRescheduled: false,
  },
  {
    id: "se4",
    courseId: "1",
    title: "DSA Flashcard Review",
    date: format(addDays(weekStart, 2), "yyyy-MM-dd"),
    startTime: "16:00",
    endTime: "17:00",
    type: "review",
    isRescheduled: false,
  },
  {
    id: "se5",
    courseId: "4",
    title: "Database Midterm",
    date: format(addDays(weekStart, 3), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "11:00",
    type: "exam",
    isRescheduled: false,
  },
  {
    id: "se6",
    courseId: "2",
    title: "OS Practice (Missed)",
    date: format(subDays(today, 2), "yyyy-MM-dd"),
    startTime: "13:00",
    endTime: "14:30",
    type: "missed",
    isRescheduled: true,
  },
  {
    id: "se7",
    courseId: "2",
    title: "OS Practice (Rescheduled)",
    date: format(addDays(today, 1), "yyyy-MM-dd"),
    startTime: "13:00",
    endTime: "14:30",
    type: "study",
    isRescheduled: true,
  },
  {
    id: "se8",
    courseId: "5",
    title: "Networks Study",
    date: format(addDays(weekStart, 4), "yyyy-MM-dd"),
    startTime: "11:00",
    endTime: "13:00",
    type: "study",
    isRescheduled: false,
  },
  {
    id: "se9",
    courseId: "3",
    title: "ML Quiz Prep",
    date: format(addDays(weekStart, 5), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "10:30",
    type: "review",
    isRescheduled: false,
  },
  {
    id: "se10",
    courseId: "1",
    title: "DSA Weekend Deep Dive",
    date: format(addDays(weekStart, 6), "yyyy-MM-dd"),
    startTime: "10:00",
    endTime: "13:00",
    type: "study",
    isRescheduled: false,
  },
];

export const visualAssets: VisualAsset[] = [
  {
    id: "va1",
    courseId: "1",
    chapterId: "ch1",
    title: "Big-O Complexity Comparison Chart",
    description: "Visual comparison of common algorithm complexities with growth curves",
    status: "approved",
    iterationCount: 2,
  },
  {
    id: "va2",
    courseId: "1",
    chapterId: "ch2",
    title: "Array vs Linked List Memory Layout",
    description: "Side-by-side comparison of how arrays and linked lists are stored in memory",
    status: "approved",
    iterationCount: 1,
  },
  {
    id: "va3",
    courseId: "1",
    chapterId: "ch3",
    title: "BST Insertion Animation Diagram",
    description: "Step-by-step diagram showing node insertion into a Binary Search Tree",
    status: "reviewing",
    iterationCount: 3,
  },
  {
    id: "va4",
    courseId: "1",
    chapterId: "ch3",
    title: "AVL Tree Rotations",
    description: "Visual guide to single and double rotations in AVL trees",
    status: "generating",
    iterationCount: 1,
  },
];

export const processingSteps: ProcessingStep[] = [
  {
    id: "ps1",
    name: "Document Chunking",
    icon: "📄",
    status: "completed",
    description: "Breaking document into logical sections",
  },
  {
    id: "ps2",
    name: "Synthesizer",
    icon: "👨‍🏫",
    status: "completed",
    description: "Writing structured summaries with Claude",
  },
  {
    id: "ps3",
    name: "Illustrator",
    icon: "🎨",
    status: "processing",
    description: "Generating educational diagrams with Gemini",
  },
  {
    id: "ps4",
    name: "Art Director",
    icon: "🧐",
    status: "pending",
    description: "Reviewing visual quality with Claude",
  },
  {
    id: "ps5",
    name: "Inquisitor",
    icon: "🧠",
    status: "pending",
    description: "Creating flashcards and questions",
  },
];

// ─── Stats ───────────────────────────────────────────────────────────────────

export const dashboardStats = {
  totalCourses: courses.length,
  flashcardsDue: flashcards.filter((f) => f.nextReview <= format(today, "yyyy-MM-dd")).length,
  tasksInProgress: kanbanTasks.filter((t) => t.status === "in-progress").length,
  upcomingExams: scheduleEvents.filter((e) => e.type === "exam").length,
  studyStreak: user.streakDays,
  totalStudyHours: user.totalStudyHours,
};

// Helper to get course by ID
export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getCourseColor(courseId: string): string {
  const idx = courses.findIndex((c) => c.id === courseId);
  return courseColors[idx >= 0 ? idx : 0];
}
