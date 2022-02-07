import 'virtual:windi.css'
import 'virtual:windi-devtools'

import "./base.css"

// 开发模式下的增加 dev
import.meta.env.DEV && document.documentElement.classList.add('dev');

// if (window.matchMedia('(prefers-color-scheme: dark)').matches)
//   document.documentElement.classList.add('dark')
// else
//   document.documentElement.classList.add('light')