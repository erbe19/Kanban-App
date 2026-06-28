export const COLUMNS = ['To do', 'Doing', 'Review', 'Done', 'Rework'];

export const LABELS = ['Feature', 'Bug', 'Issue', 'Undefined'];
export const PRIORITIES = ['Low', 'Medium', 'High'];

export const MEMBERS = [
  { id: 'm1', name: 'Adi', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adi' },
  { id: 'm2', name: 'Budi', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi' },
  { id: 'm3', name: 'Citra', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Citra' },
  { id: 'm4', name: 'Dewi', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi' },
  { id: 'm5', name: 'Eko', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eko' },
];

export const INITIAL_TASKS = {
  'To do': [
    {
      id: 'task-1',
      title: 'Research for a podcast and video website',
      description: 'Menganalisis kebutuhan konten video dan distribusi audio.',
      label: 'Feature',
      priority: 'Low',
      dueDate: '2026-08-08',
      assignee: ['m1', 'm2'],
      checklist: [{ id: 'sub-1', text: 'Studi literatur', isCompleted: false }],
      attachments: []
    },
    {
      id: 'task-2',
      title: 'Debug checkout process for the e-commerce website',
      description: 'Memperbaiki kalkulasi payment gateway otomatis.',
      label: 'Bug',
      priority: 'High',
      dueDate: '2026-10-19',
      assignee: ['m1', 'm2', 'm3'],
      checklist: Array(19).fill({ isCompleted: false }),
      attachments: Array(43).fill('dummy_log.txt')
    },
    {
      id: 'task-3',
      title: 'Review interior styling and configuration layout',
      description: 'Sinkronisasi rendering aset interior ruang tamu komunal.',
      label: 'Feature',
      priority: 'Medium',
      dueDate: '2026-08-15',
      assignee: ['m4', 'm5'],
      checklist: [],
      attachments: [],
      coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80'
    }
  ],
  'Doing': [
    {
      id: 'task-4',
      title: 'Design wireframes for the landing page revamp',
      description: 'Membuat rancangan UI resolusi tinggi untuk halaman utama.',
      label: 'Feature',
      priority: 'High',
      dueDate: '2026-08-12',
      assignee: ['m1', 'm3'],
      checklist: Array(12).fill({ isCompleted: true }),
      attachments: []
    },
    {
      id: 'task-5',
      title: 'Analyze structural geometric wireframes',
      description: 'Eksperimen estetika desain brutalist arsitektural modern.',
      label: 'Undefined',
      priority: 'Low',
      dueDate: '2026-08-22',
      assignee: ['m2'],
      checklist: [],
      attachments: [],
      coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80'
    }
  ],
  'Review': [
    {
      id: 'task-6',
      title: 'Create and refine logo designs for the UI brand',
      description: 'Iterasi pilihan kombinasi warna korporat baru.',
      label: 'Issue',
      priority: 'Medium',
      dueDate: '2026-08-25',
      assignee: ['m3', 'm5'],
      checklist: Array(52).fill({ isCompleted: false }),
      attachments: [],
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80'
    },
    {
      id: 'task-7',
      title: 'Create an icon library for the project.',
      description: 'Standardisasi library aset SVG internal.',
      label: 'Feature',
      priority: 'Low',
      dueDate: '2026-08-08',
      assignee: ['m1', 'm4'],
      checklist: Array(18).fill({ isCompleted: true }),
      attachments: []
    }
  ],
  'Done': [
    {
      id: 'task-8',
      title: 'Create the Email Page layout and necessary components',
      description: 'Slicing layout email marketing responsif.',
      label: 'Feature',
      priority: 'Low',
      dueDate: '2026-07-10',
      assignee: ['m2', 'm5'],
      checklist: Array(43).fill({ isCompleted: true }),
      attachments: []
    },
    {
      id: 'task-9',
      title: 'Enhance website usability through user feedback',
      description: 'Optimasi penempatan CTA utama.',
      label: 'Feature',
      priority: 'Medium',
      dueDate: '2026-07-29',
      assignee: ['m1'],
      checklist: Array(14).fill({ isCompleted: true }),
      attachments: []
    },
    {
      id: 'task-10',
      title: 'Finalize architectural kitchen platform sync',
      description: 'Penyelarasan modul katalog peralatan dapur.',
      label: 'Feature',
      priority: 'Low',
      dueDate: '2026-08-01',
      assignee: ['m3'],
      checklist: [],
      attachments: [],
      coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80'
    }
  ],
  'Rework': [
    {
      id: 'task-11',
      title: 'Blog Edit Page Modification and Playlist Page Design',
      description: 'Perbaikan tata letak input artikel blog.',
      label: 'Feature',
      priority: 'High',
      dueDate: '2026-08-08',
      assignee: ['m2', 'm4'],
      checklist: Array(40).fill({ isCompleted: false }),
      attachments: []
    },
    {
      id: 'task-12',
      title: 'Plan and execute training sessions for new hires',
      description: 'Orientasi pengerjaan basis kode internal.',
      label: 'Issue',
      priority: 'High',
      dueDate: '2026-08-09',
      assignee: ['m1', 'm3'],
      checklist: Array(19).fill({ isCompleted: false }),
      attachments: [],
      coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80'
    }
  ]
};