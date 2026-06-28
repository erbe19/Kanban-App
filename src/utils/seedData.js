export const seedTasks = {
  'To do': [
    {
      id: 'task-1',
      title: 'Research for a podcast and video website',
      description: 'Menganalisis kebutuhan konten video dan struktur distribusi audio podcast.',
      label: 'Feature',
      priority: 'Low',
      dueDate: '2026-08-08',
      assignee: ['m1', 'm2'],
      checklist: [],
      attachments: []
    },
    {
      id: 'task-2',
      title: 'Debug checkout process for the e-commerce website',
      description: 'Memperbaiki hambatan pembayaran dan kalkulasi pajak otomatis pada halaman keranjang.',
      label: 'Bug',
      priority: 'High',
      dueDate: '2026-10-19',
      assignee: ['m1', 'm2', 'm3'],
      checklist: Array(19).fill({ isCompleted: false }), // Simulasi info 10/19 di gambar
      attachments: ['payment_log.csv']
    },
    {
      id: 'task-3',
      title: 'Review interior styling and configuration layout',
      description: 'Sinkronisasi rendering aset 3D untuk ruang kerja komunal.',
      label: 'Feature',
      priority: 'Medium',
      dueDate: '2026-08-15',
      assignee: ['m3'],
      checklist: [],
      attachments: [],
      coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&auto=format&fit=crop&q=60'
    }
  ],
  'Doing': [
    {
      id: 'task-4',
      title: 'Design wireframes for the landing page revamp',
      description: 'Membuat sketsa tata letak resolusi tinggi untuk konversi user baru.',
      label: 'Feature',
      priority: 'High',
      dueDate: '2026-08-12',
      assignee: ['m1', 'm3'],
      checklist: [],
      attachments: []
    },
    {
      id: 'task-5',
      title: 'Analyze structural geometric wireframes',
      description: 'Eksperimen estetika brutalist modern pada modul visual aplikasi.',
      label: 'Undefined',
      priority: 'Low',
      dueDate: '2026-08-22',
      assignee: ['m2'],
      checklist: [],
      attachments: [],
      coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=60'
    }
  ],
  'Review': [
    {
      id: 'task-6',
      title: 'Create and refine logo designs for the UI brand',
      description: 'Iterasi warna korporat dan alternatif ikonografi vektor.',
      label: 'Issue',
      priority: 'Medium',
      dueDate: '2026-08-25',
      assignee: ['m1', 'm2'],
      checklist: [],
      attachments: [],
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 'task-7',
      title: 'Create an icon library for the project.',
      description: 'Ekspor koleksi SVG terstandarisasi untuk kebutuhan visual tim.',
      label: 'Feature',
      priority: 'Low',
      dueDate: '2026-08-08',
      assignee: ['m3'],
      checklist: Array(18).fill({ isCompleted: false }),
      attachments: []
    }
  ],
  'Done': [
    {
      id: 'task-8',
      title: 'Create the Email Page layout and necessary components',
      description: 'Slicing template responsif untuk modul newsletter mingguan.',
      label: 'Feature',
      priority: 'Low',
      dueDate: '2026-07-10',
      assignee: ['m2', 'm3'],
      checklist: [],
      attachments: []
    },
    {
      id: 'task-9',
      title: 'Enhance website usability through user feedback',
      description: 'Optimalisasi ukuran target klik tombol berdasarkan data rekaman sesi *Hotjar*.',
      label: 'Feature',
      priority: 'Medium',
      dueDate: '2026-07-29',
      assignee: ['m1'],
      checklist: [],
      attachments: []
    },
    {
      id: 'task-10',
      title: 'Finalize architectural kitchen platform sync',
      description: 'Penyelarasan modul katalog peralatan rumah tangga.',
      label: 'Feature',
      priority: 'Low',
      dueDate: '2026-08-01',
      assignee: ['m2'],
      checklist: [],
      attachments: [],
      coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=60'
    }
  ],
  'Rework': [
    {
      id: 'task-11',
      title: 'Blog Edit Page Modification and Playlist Page Design',
      description: 'Perbaikan tata letak input teks artikel dan urutan daftar putar audio.',
      label: 'Feature',
      priority: 'High',
      dueDate: '2026-08-08',
      assignee: ['m1', 'm3'],
      checklist: Array(22).fill({ isCompleted: false }),
      attachments: []
    },
    {
      id: 'task-12',
      title: 'Plan and execute training sessions for new hires',
      description: 'Orientasi pengerjaan basis kode internal dan aturan arsitektur sistem.',
      label: 'Issue',
      priority: 'High',
      dueDate: '2026-08-09',
      assignee: ['m1', 'm2'],
      checklist: Array(19).fill({ isCompleted: false }),
      attachments: []
    }
  ]
};