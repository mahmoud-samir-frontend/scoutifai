import { Component, Input } from '@angular/core';
@Component({selector:'app-icon',standalone:true,template:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="paths[name] || paths['grid']"/></svg>`,styles:[`:host{display:inline-flex;width:22px;height:22px}:host svg{width:100%;height:100%;overflow:visible}:host-context(a:hover) svg,:host-context(a.active) svg{filter:drop-shadow(0 3px 5px #032d2125)}`]})
export class AppIconComponent{
  @Input() name='grid';
  paths:Record<string,string>={
    grid:'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z',
    users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    team:'M12 3 3 7v6c0 5 3.5 7.5 9 9 5.5-1.5 9-4 9-9V7l-9-4z M8 12h8 M12 8v8',
    calendar:'M3 5h18v16H3z M16 3v4 M8 3v4 M3 10h18',
    check:'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
    tasks:'M9 5h11 M9 12h11 M9 19h11 M4 5h.01 M4 12h.01 M4 19h.01',
    trophy:'M8 21h8 M12 17v4 M7 4h10v5a5 5 0 0 1-10 0V4z M7 6H4v2a3 3 0 0 0 3 3 M17 6h3v2a3 3 0 0 1-3 3',
    chart:'M4 19V9 M10 19V5 M16 19v-7 M22 19V2',
    activity:'M3 12h4l2-7 4 14 2-7h6',
    heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z',
    medical:'M12 2v20 M2 12h20',
    video:'M3 5h13v14H3z M16 10l5-3v10l-5-3',
    bell:'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4',
    mail:'M3 5h18v14H3z M3 7l9 7 9-7',
    lock:'M5 10h14v11H5z M8 10V7a4 4 0 0 1 8 0v3',
    eye:'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
    eyeOff:'M3 3l18 18 M10.6 10.6a2 2 0 0 0 2.8 2.8 M9.9 5.2A11 11 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-2.1 3.1 M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7c1.5 0 2.8-.3 4-.8',
    search:'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16 M21 21l-4.35-4.35',
    globe:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20 M2 12h20 M12 2c3 3 3 17 0 20 M12 2c-3 3-3 17 0 20',
    logout:'M10 17l5-5-5-5 M15 12H3 M21 19V5a2 2 0 0 0-2-2h-6',
    roles:'M12 3 4 6v5c0 5 3 8 8 10 5-2 8-5 8-10V6l-8-3z M9 12l2 2 4-5'
  };
  accentPaths:Record<string,string>={users:'M17.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5',team:'M12 6.5 14 8l-.8 2.4h-2.4L10 8z',calendar:'M17 12h3v3h-3z',check:'M18 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6',trophy:'M10 7h4v4h-4z',chart:'M19 2h3v5h-3z',activity:'M11 10h3v4h-3z',heart:'M10.5 8.5h3v3h-3z',medical:'M9.5 9.5h5v5h-5z',video:'M8 9l5 3-5 3z',bell:'M17 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6',roles:'M10.5 9h3v3h-3z'};
}
