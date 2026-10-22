import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { supabase } from './lib/supabase.js';
import {
  Crown,
  Eye,
  Gift,
  GraduationCap,
  LockKeyhole,
  Medal,
  Minus,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

const INITIAL_STUDENTS = [
  { id: 1, nameEng: 'BRAYDEN TING YIK HAO', nameChi: '陈育豪', gifts: 0 },
  { id: 2, nameEng: 'CHANG YU JIE', nameChi: '曾禹捷', gifts: 0 },
  { id: 3, nameEng: 'CHIA EE LER', nameChi: '谢以乐', gifts: 0 },
  { id: 4, nameEng: 'CHONG SHU HAO', nameChi: '张书豪', gifts: 0 },
  { id: 5, nameEng: 'EPHRAIM CHEE ZHE KAI', nameChi: '徐泽恺', gifts: 0 },
  { id: 6, nameEng: 'GORDON LIEW HONG SHUN', nameChi: '刘鸿顺', gifts: 0 },
  { id: 7, nameEng: 'JARRETT WONG EN KAI', nameChi: '黄恩慨', gifts: 0 },
  { id: 8, nameEng: 'KOH JIN HAO', nameChi: '许晋皓', gifts: 0 },
  { id: 9, nameEng: 'LEE YU ZHER', nameChi: '李禹泽', gifts: 0 },
  { id: 10, nameEng: 'LEE ZHE CHEN', nameChi: '李哲诚', gifts: 0 },
  { id: 11, nameEng: 'LIEW CHEN YANG', nameChi: '刘宸阳', gifts: 0 },
  { id: 12, nameEng: 'LIM ZHEN YU', nameChi: '林振宇', gifts: 0 },
  { id: 13, nameEng: 'NATHAN TAN GUAN YU', nameChi: '陈冠宇', gifts: 0 },
  { id: 14, nameEng: 'RICKY RYAN ROODSTONE', nameChi: '瑞奇', gifts: 0 },
  { id: 15, nameEng: 'SAW WEI ER', nameChi: '苏韦尔', gifts: 0 },
  { id: 16, nameEng: 'TAI ZHER', nameChi: '戴哲', gifts: 0 },
  { id: 17, nameEng: 'TAKA OH YUN LEY', nameChi: '胡允礼', gifts: 0 },
  { id: 18, nameEng: 'TING JIA MING', nameChi: '陈家茗', gifts: 0 },
  { id: 19, nameEng: 'TOO TECK HWA', nameChi: '蔡德华', gifts: 0 },
  { id: 20, nameEng: 'WONG ZHI HUI', nameChi: '黄志辉', gifts: 0 },
  { id: 21, nameEng: 'CARYS LEE YUN EN', nameChi: '李昀蒽', gifts: 0 },
  { id: 22, nameEng: 'CHEE FENG YI', nameChi: '朱凤仪', gifts: 0 },
  { id: 23, nameEng: 'CHENG TING YEE', nameChi: '庄婷伊', gifts: 0 },
  { id: 24, nameEng: "ELIORA KH'NG YU CHEN", nameChi: '康语宸', gifts: 0 },
  { id: 25, nameEng: 'GOH RU WEI', nameChi: '吴茹蔚', gifts: 0 },
  { id: 26, nameEng: 'JANICE LIM JIE EN', nameChi: '林洁恩', gifts: 0 },
  { id: 27, nameEng: 'KHOO JIA YING', nameChi: '古佳颖', gifts: 0 },
  { id: 28, nameEng: 'LEE WAN SHUEN', nameChi: '李宛轩', gifts: 0 },
  { id: 29, nameEng: 'LIM YU QING', nameChi: '林妤晴', gifts: 0 },
  { id: 30, nameEng: 'MIKA OH YUN FAY', nameChi: '胡允妃', gifts: 0 },
  { id: 31, nameEng: 'MOK SAN NEE', nameChi: '莫善淣', gifts: 0 },
  { id: 32, nameEng: 'TAN SIE TONG', nameChi: '陈司桐', gifts: 0 },
  { id: 33, nameEng: 'TEONG NING XUAN', nameChi: '张甯媗', gifts: 0 },
  { id: 34, nameEng: 'YAP JENN TANG', nameChi: '叶婧棠', gifts: 0 },
  { id: 35, nameEng: 'ZOE ER', nameChi: '余玥熹', gifts: 0 },
  { id: 36, nameEng: 'ASYTHN CHONG', nameChi: '张悦晨', gifts: 0 },
  { id: 37, nameEng: 'OOI FOO RAN', nameChi: '黄福然', gifts: 0 },
];

const STORAGE_KEY = 'class-gift-board-students';

function loadStudents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_STUDENTS;
    const parsed = JSON.parse(saved);
    const valid = Array.isArray(parsed)
      && parsed.length === INITIAL_STUDENTS.length
      && parsed.every((student) => Number.isInteger(student.gifts) && student.gifts >= 0);
    return valid ? parsed : INITIAL_STUDENTS;
  } catch {
    return INITIAL_STUDENTS;
  }
}

function playCelebrationSound() {
  const AudioContextType = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextType) return;

  const audio = new AudioContextType();
  [659.25, 783.99, 987.77].forEach((frequency, index) => {
    const start = audio.currentTime + index * 0.085;
    const oscillator = audio.createOscillator();
    const volume = audio.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, start);
    volume.gain.setValueAtTime(0.0001, start);
    volume.gain.exponentialRampToValueAtTime(0.12, start + 0.018);
    volume.gain.exponentialRampToValueAtTime(0.001, start + 0.24);
    oscillator.connect(volume);
    volume.connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.25);
  });
  window.setTimeout(() => audio.close(), 650);
}

export default function App() {
  const [students, setStudents] = useState(loadStudents);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeEffectId, setActiveEffectId] = useState(null);
  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [syncStatus, setSyncStatus] = useState(supabase ? 'connecting' : 'local');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch {
      // The board still works when browser storage is unavailable.
    }
  }, [students]);

  useEffect(() => {
    if (!supabase) {
      setSyncStatus('local');
      return undefined;
    }

    let isMounted = true;
    const loadSharedBoard = async () => {
      const { data, error } = await supabase
        .from('class_gift_board')
        .select('students')
        .eq('id', 'class-1c')
        .maybeSingle();

      if (!isMounted) return;
      if (error) {
        setSyncStatus('offline');
        return;
      }
      if (Array.isArray(data?.students)) setStudents(data.students);
      setSyncStatus('live');
    };

    void loadSharedBoard();
    const channel = supabase
      .channel('class-1c-live-board')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'class_gift_board', filter: 'id=eq.class-1c' },
        (payload) => {
          if (Array.isArray(payload.new?.students)) setStudents(payload.new.students);
        },
      )
      .subscribe((status) => {
        if (!isMounted) return;
        if (status === 'SUBSCRIBED') setSyncStatus('live');
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') setSyncStatus('offline');
      });

    return () => {
      isMounted = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!showTeacherLogin) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeTeacherLogin();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTeacherLogin]);

  const visibleStudents = useMemo(
    () => isTeacherMode
      ? students
      : [...students].sort((first, second) => second.gifts - first.gifts || first.id - second.id),
    [isTeacherMode, students],
  );
  const totalGifts = students.reduce((total, student) => total + student.gifts, 0);

  function closeTeacherLogin() {
    setShowTeacherLogin(false);
    setTeacherEmail('');
    setTeacherPassword('');
    setPasswordError('');
  }

  async function saveSharedStudents(nextStudents) {
    if (!supabase) return;
    const { error } = await supabase.from('class_gift_board').upsert({
      id: 'class-1c',
      students: nextStudents,
      updated_at: new Date().toISOString(),
    });
    setSyncStatus(error ? 'offline' : 'live');
  }

  function addGift(id, event) {
    const rect = event.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 75,
      spread: 75,
      startVelocity: 34,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ['#ffcf56', '#ff7a65', '#55bea3', '#7ba7ed', '#ed8bc2'],
    });
    if (soundEnabled) playCelebrationSound();
    setActiveEffectId(id);
    window.setTimeout(() => setActiveEffectId(null), 1100);
    const nextStudents = students.map((student) =>
      student.id === id ? { ...student, gifts: student.gifts + 1 } : student,
    );
    setStudents(nextStudents);
    void saveSharedStudents(nextStudents);
  }

  function removeGift(id) {
    const nextStudents = students.map((student) =>
      student.id === id ? { ...student, gifts: Math.max(0, student.gifts - 1) } : student,
    );
    setStudents(nextStudents);
    void saveSharedStudents(nextStudents);
  }

  async function enterTeacherMode(event) {
    event.preventDefault();
    if (!supabase) {
      setPasswordError('共享实时服务尚未配置。');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: teacherEmail, password: teacherPassword });
    if (error) {
      setPasswordError('登录失败，请检查老师邮箱和密码。');
      return;
    }
    setIsTeacherMode(true);
    closeTeacherLogin();
  }

  async function exitTeacherMode() {
    if (supabase) await supabase.auth.signOut();
    setIsTeacherMode(false);
  }

  const syncLabel = {
    connecting: '正在连接',
    live: '实时同步中',
    offline: '同步连接失败',
    local: '仅此设备',
  }[syncStatus];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top" aria-label="1C 班排行榜首页">
            <span className="brand-mark"><Sparkles size={18} strokeWidth={2.5} /></span>
            <span>CLASS 1C <b>/</b> QUIZ PARTY</span>
          </a>
          <div className="topbar-actions">
            <span className="topbar-note"><span className="live-dot" /> 08—23 OCT</span>
            {isTeacherMode && (
              <button
                className="icon-text-button sound-toggle"
                onClick={() => setSoundEnabled((enabled) => !enabled)}
                aria-label={soundEnabled ? '关闭音效' : '开启音效'}
                aria-pressed={soundEnabled}
                title={soundEnabled ? '关闭音效' : '开启音效'}
              >
                {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
                <span>{soundEnabled ? '音效开' : '音效关'}</span>
              </button>
            )}
            <button
              className="icon-text-button teacher-access-button"
              onClick={() => isTeacherMode ? void exitTeacherMode() : setShowTeacherLogin(true)}
            >
              {isTeacherMode ? <Eye size={16} /> : <GraduationCap size={16} />}
              <span>{isTeacherMode ? '学生榜单' : '老师入口'}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="main-content">
        <section className="intro-row">
          <div className="intro-copy">
            <p className="eyebrow">RAISE YOUR HAND · LIGHT UP THE BOARD</p>
            <h1>1C网课 <span>Quiz 互动礼物榜</span><span className="title-date">(8/10 - 23/10)</span><Sparkles className="title-sparkle" size={25} /></h1>
            <p className="intro-subtitle">每一次认真参与，都值得一个闪亮时刻！</p>
          </div>
          {isTeacherMode && (
            <div className="teacher-mode-label"><GraduationCap size={16} /> 老师控制台</div>
          )}
        </section>

        <section className="roster-section">
          <div className="roster-heading">
            <div>
              <p className="eyebrow">THE CLASS 1C CREW</p>
              <h2>{isTeacherMode ? '给今天的表现点个赞' : '实时排行榜'} <span>{visibleStudents.length} 位同学</span></h2>
            </div>
            <div className="board-total">
              <span className={`sync-indicator sync-${syncStatus}`} aria-live="polite">
                <span className="sync-dot" />{syncLabel}
              </span>
              <span className="total-sparkle"><Sparkles size={16} /></span>
              <span>累计送出 <strong>{totalGifts}</strong> 份礼物</span>
            </div>
          </div>

          <div className={`student-grid${isTeacherMode ? ' teacher-grid' : ' leaderboard-grid'}`}>
            {visibleStudents.map((student, index) => {
              const isGlowing = activeEffectId === student.id;
              return (
                <article
                  key={student.id}
                  className={`student-card${!isTeacherMode && index < 3 ? ` podium-card podium-card-${index + 1}` : ''}${isGlowing ? ' glowing' : ''}`}
                  style={{ '--card-index': index }}
                >
                  <div className="card-topline">
                    {isTeacherMode ? (
                      <span className="student-number">NO. {String(student.id).padStart(2, '0')}</span>
                    ) : (
                      <span className={`student-number rank-number${index < 3 ? ` podium-${index + 1}` : ''}`}>
                        {index === 0 && <Crown size={17} aria-label="第一名" />}
                        {index > 0 && index < 3 && <Medal size={17} aria-label={index === 1 ? '第二名' : '第三名'} />}
                        {index < 3 ? ['冠军', '亚军', '季军'][index] : `第 ${String(index + 1).padStart(2, '0')} 名`}
                      </span>
                    )}
                    {isTeacherMode && (
                      <span className={`gift-badge${student.gifts ? ' has-gifts' : ''}`}>
                        {student.gifts >= 5 ? <Trophy size={17} /> : <Gift size={17} />}
                      </span>
                    )}
                  </div>
                  <div className="student-name">
                    <h3>{student.nameChi}</h3>
                    <p>{student.nameEng}</p>
                  </div>
                  <div className="card-bottomline">
                    <span className="count-label">数量</span>
                    <div className={`gift-count${student.gifts > 0 ? ' has-count' : ''}`}>
                      <strong key={student.gifts}>{student.gifts}</strong><span>份</span>
                    </div>
                  </div>
                  {isGlowing && (
                    <div className="gift-toast"><Sparkles size={13} /> +1 闪亮时刻！</div>
                  )}
                  {isTeacherMode && (
                    <div className="card-actions">
                      <button className="give-button" onClick={(event) => addGift(student.id, event)}>
                        <Sparkles size={15} /><span>送出 1 份</span>
                      </button>
                      {student.gifts > 0 && (
                        <button
                          className="remove-button"
                          onClick={() => removeGift(student.id)}
                          aria-label={`扣减 ${student.nameChi} 的数量`}
                          title="扣减 1 份"
                        >
                          <Minus size={16} />
                        </button>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <footer className="page-footer">
          <span>CLASS 1C · QUIZ PARTY</span>
          <span>SHOW UP · SHINE ON</span>
        </footer>
      </main>

      {showTeacherLogin && (
        <div
          className="login-backdrop"
          onMouseDown={(event) => event.target === event.currentTarget && closeTeacherLogin()}
        >
          <form className="login-dialog" onSubmit={enterTeacherMode} aria-labelledby="login-title">
            <button className="login-close" type="button" onClick={closeTeacherLogin} aria-label="关闭">
              <X size={18} />
            </button>
            <span className="login-icon"><LockKeyhole size={21} /></span>
            <p className="eyebrow">TEACHER ACCESS</p>
            <h2 id="login-title">老师控制台</h2>
            <p className="login-copy">使用老师账号登录，管理榜单。</p>
            <label className="password-label" htmlFor="teacher-email">老师邮箱</label>
            <input
              id="teacher-email"
              className="password-input email-input"
              type="email"
              autoComplete="username"
              value={teacherEmail}
              onChange={(event) => {
                setTeacherEmail(event.target.value);
                setPasswordError('');
              }}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? 'password-error' : undefined}
              autoFocus
            />
            <label className="password-label" htmlFor="teacher-password">密码</label>
            <input
              id="teacher-password"
              className="password-input"
              type="password"
              autoComplete="current-password"
              value={teacherPassword}
              onChange={(event) => {
                setTeacherPassword(event.target.value);
                setPasswordError('');
              }}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? 'password-error' : undefined}
              autoFocus
            />
            {passwordError && <p className="password-error" id="password-error">{passwordError}</p>}
            <button className="login-submit" type="submit">进入控制台 <span aria-hidden="true">→</span></button>
          </form>
        </div>
      )}
    </div>
  );
}