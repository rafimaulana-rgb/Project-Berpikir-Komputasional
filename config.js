        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        terracotta: {
                            50: '#fff7ed',
                            100: '#ffedd5',
                            500: '#ea580c',
                            600: '#c2410c',
                            700: '#9a3412',
                        },
                        teal: {
                            800: '#064e3b',
                            900: '#022c22',
                            950: '#012018',
                        },
                        navy: {
                            800: '#0f172a',
                            900: '#090d16',
                            950: '#030712',
                        },
                        gold: {
                            400: '#fbbf24',
                            500: '#f59e0b',
                            600: '#d97706',
                        },
                        cream: '#fdfbf7',
                    },
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                        serif: ['"Playfair Display"', 'serif'],
                    },
                    animation: {
                        'float': 'float 4s ease-in-out infinite',
                        'pulse-glow': 'pulseGlow 2s infinite',
                        'dash': 'dash 20s linear infinite',
                        'shimmer': 'shimmer 2.5s infinite linear',
                        'sparkle': 'sparkle 1.5s ease-in-out infinite alternate',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-8px)' },
                        },
                        pulseGlow: {
                            '0%, 100%': { opacity: '1', boxShadow: '0 0 15px rgba(234, 88, 12, 0.4)' },
                            '50%': { opacity: '0.85', boxShadow: '0 0 25px rgba(234, 88, 12, 0.7)' },
                        },
                        sparkle: {
                            '0%': { opacity: '0.3', transform: 'scale(0.8)' },
                            '100%': { opacity: '1', transform: 'scale(1.2)' },
                        }
                    }
                }
            }
        }