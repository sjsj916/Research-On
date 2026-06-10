import { useState, useEffect, useRef } from "react";

const C = {
  black:"#111111", gray900:"#1F1F1F", gray700:"#404040",
  gray500:"#737373", gray300:"#C4C4C4", gray200:"#DEDEDE",
  gray100:"#F0F0F0", gray50:"#F7F7F7", white:"#FFFFFF", border:"#E5E5E5",
  green:"#166534", greenBg:"#DCFCE7",
  red:"#B91C1C",   redBg:"#FEE2E2",
  amber:"#92400E", amberBg:"#FEF3C7",
};

// ─── SVG 일러스트 ──────────────────────────────────────────

// 히어로 일러스트 - 연구자와 참가자 연결
function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:480}}>
      {/* 배경 원 */}
      <circle cx="240" cy="160" r="130" fill="#F7F7F7"/>
      {/* 연결선 */}
      <path d="M120 160 Q240 80 360 160" stroke="#E5E5E5" strokeWidth="2" strokeDasharray="6 4"/>
      <path d="M120 160 Q240 240 360 160" stroke="#E5E5E5" strokeWidth="2" strokeDasharray="6 4"/>
      {/* 왼쪽 인물 (연구자) */}
      <circle cx="100" cy="130" r="28" fill="#111111"/>
      <circle cx="100" cy="119" r="11" fill="white"/>
      <path d="M78 155 Q100 148 122 155 L126 185 Q100 192 74 185Z" fill="white"/>
      {/* 연구자 아이콘 (클립보드) */}
      <rect x="86" y="200" width="28" height="34" rx="3" fill="#111111"/>
      <rect x="91" y="196" width="18" height="7" rx="2" fill="#404040"/>
      <line x1="91" y1="212" x2="109" y2="212" stroke="white" strokeWidth="1.5"/>
      <line x1="91" y1="219" x2="109" y2="219" stroke="white" strokeWidth="1.5"/>
      <line x1="91" y1="226" x2="103" y2="226" stroke="white" strokeWidth="1.5"/>
      {/* 오른쪽 인물 (참가자) */}
      <circle cx="380" cy="130" r="28" fill="#404040"/>
      <circle cx="380" cy="119" r="11" fill="white"/>
      <path d="M358 155 Q380 148 402 155 L406 185 Q380 192 354 185Z" fill="white"/>
      {/* 참가자 아이콘 (사람) */}
      <circle cx="380" cy="207" r="9" fill="#404040"/>
      <path d="M364 234 Q380 224 396 234 L398 240 Q380 247 362 240Z" fill="#404040"/>
      {/* 가운데 - 리서치온 로고 */}
      <rect x="216" y="136" width="48" height="48" rx="10" fill="#111111"/>
      <text x="240" y="167" textAnchor="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="sans-serif">R</text>
      {/* 점선 연결 노드 */}
      <circle cx="170" cy="120" r="5" fill="#C4C4C4"/>
      <circle cx="310" cy="120" r="5" fill="#C4C4C4"/>
      <circle cx="170" cy="200" r="5" fill="#C4C4C4"/>
      <circle cx="310" cy="200" r="5" fill="#C4C4C4"/>
      {/* 레이블 */}
      <rect x="60" y="240" width="80" height="22" rx="11" fill="#F0F0F0"/>
      <text x="100" y="255" textAnchor="middle" fill="#404040" fontSize="10" fontWeight="700" fontFamily="sans-serif">연구자</text>
      <rect x="340" y="240" width="80" height="22" rx="11" fill="#F0F0F0"/>
      <text x="380" y="255" textAnchor="middle" fill="#404040" fontSize="10" fontWeight="700" fontFamily="sans-serif">참가자</text>
    </svg>
  );
}

// 빈 상태 일러스트
function EmptyIllustration({label="아직 등록된 연구가 없어요"}) {
  return (
    <div style={{textAlign:"center",padding:"60px 24px"}}>
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:160,marginBottom:20}}>
        {/* 클립보드 */}
        <rect x="50" y="30" width="100" height="120" rx="8" fill="#F0F0F0"/>
        <rect x="75" y="22" width="50" height="18" rx="6" fill="#DEDEDE"/>
        {/* 빈 선들 */}
        <rect x="65" y="65" width="70" height="8" rx="4" fill="#DEDEDE"/>
        <rect x="65" y="82" width="55" height="8" rx="4" fill="#DEDEDE"/>
        <rect x="65" y="99" width="62" height="8" rx="4" fill="#DEDEDE"/>
        <rect x="65" y="116" width="40" height="8" rx="4" fill="#DEDEDE"/>
        {/* 돋보기 */}
        <circle cx="148" cy="128" r="22" fill="white" stroke="#DEDEDE" strokeWidth="3"/>
        <circle cx="148" cy="128" r="14" stroke="#C4C4C4" strokeWidth="2.5"/>
        <line x1="158" y1="138" x2="168" y2="150" stroke="#C4C4C4" strokeWidth="3" strokeLinecap="round"/>
        {/* X 표시 */}
        <line x1="143" y1="123" x2="153" y2="133" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round"/>
        <line x1="153" y1="123" x2="143" y2="133" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <p style={{fontSize:16,fontWeight:700,color:C.gray500,marginBottom:6}}>{label}</p>
      <p style={{fontSize:13,color:C.gray300}}>첫 번째로 등록해보세요!</p>
    </div>
  );
}

// 익명게시판 빈 상태
function BoardEmptyIllustration() {
  return (
    <div style={{textAlign:"center",padding:"60px 24px"}}>
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:140,marginBottom:20}}>
        <rect x="20" y="20" width="160" height="30" rx="6" fill="#F0F0F0"/>
        <rect x="30" y="29" width="60" height="12" rx="3" fill="#DEDEDE"/>
        <rect x="148" y="29" width="22" height="12" rx="3" fill="#E5E5E5"/>
        <rect x="20" y="58" width="160" height="30" rx="6" fill="#F0F0F0"/>
        <rect x="30" y="67" width="80" height="12" rx="3" fill="#DEDEDE"/>
        <rect x="20" y="96" width="160" height="30" rx="6" fill="#F0F0F0"/>
        <rect x="30" y="105" width="50" height="12" rx="3" fill="#DEDEDE"/>
        {/* 말풍선 */}
        <circle cx="155" cy="140" r="18" fill="#F0F0F0"/>
        <path d="M145 149 L140 157 L152 152Z" fill="#F0F0F0"/>
        <circle cx="150" cy="140" r="3" fill="#C4C4C4"/>
        <circle cx="158" cy="140" r="3" fill="#C4C4C4"/>
        <circle cx="166" cy="140" r="3" fill="#C4C4C4"/>
      </svg>
      <p style={{fontSize:15,fontWeight:700,color:C.gray500,marginBottom:6}}>아직 게시글이 없어요</p>
      <p style={{fontSize:13,color:C.gray300}}>첫 번째 글을 작성해보세요!</p>
    </div>
  );
}

// 카테고리 일러스트들
function ResearchIcon({size=48}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:size,height:size}}>
      <rect x="8" y="10" width="36" height="44" rx="4" fill="#F0F0F0"/>
      <rect x="22" y="5" width="16" height="10" rx="3" fill="#DEDEDE"/>
      <rect x="15" y="24" width="22" height="4" rx="2" fill="#C4C4C4"/>
      <rect x="15" y="33" width="18" height="4" rx="2" fill="#C4C4C4"/>
      <rect x="15" y="42" width="14" height="4" rx="2" fill="#C4C4C4"/>
      <circle cx="48" cy="46" r="10" fill="white" stroke="#111111" strokeWidth="2.5"/>
      <circle cx="48" cy="46" r="6" stroke="#111111" strokeWidth="2"/>
      <line x1="53" y1="51" x2="58" y2="57" stroke="#111111" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function GraduateIcon({size=48}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:size,height:size}}>
      {/* 학사모 */}
      <polygon points="32,10 58,22 32,34 6,22" fill="#111111"/>
      <rect x="50" y="22" width="3" height="16" rx="1.5" fill="#404040"/>
      <circle cx="51.5" cy="38" r="3" fill="#404040"/>
      {/* 가운 */}
      <path d="M20 36 Q32 44 44 36 L46 58 Q32 62 18 58Z" fill="#F0F0F0"/>
      <path d="M20 36 L18 58 L14 54 L16 36Z" fill="#E5E5E5"/>
      <path d="M44 36 L46 58 L50 54 L48 36Z" fill="#E5E5E5"/>
      {/* 사람 얼굴 */}
      <circle cx="32" cy="30" r="0" fill="none"/>
    </svg>
  );
}

function UndergraduateIcon({size=48}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:size,height:size}}>
      {/* 책 */}
      <rect x="8" y="14" width="22" height="36" rx="3" fill="#111111"/>
      <rect x="10" y="16" width="18" height="32" rx="2" fill="#F0F0F0"/>
      <rect x="13" y="22" width="12" height="2.5" rx="1.2" fill="#DEDEDE"/>
      <rect x="13" y="28" width="10" height="2.5" rx="1.2" fill="#DEDEDE"/>
      <rect x="13" y="34" width="11" height="2.5" rx="1.2" fill="#DEDEDE"/>
      {/* 연필 */}
      <rect x="34" y="18" width="8" height="28" rx="2" transform="rotate(15 34 18)" fill="#404040"/>
      <polygon points="42,42 46,50 38,48" transform="rotate(15 42 42)" fill="#C4C4C4"/>
      <rect x="34" y="18" width="8" height="7" rx="2" transform="rotate(15 34 18)" fill="#DEDEDE"/>
      {/* 사람 */}
      <circle cx="50" cy="22" r="7" fill="#F0F0F0" stroke="#DEDEDE" strokeWidth="1.5"/>
      <path d="M40 44 Q50 37 60 44 L60 50 Q50 54 40 50Z" fill="#F0F0F0" stroke="#DEDEDE" strokeWidth="1.5"/>
    </svg>
  );
}

function BoardIcon({size=48}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:size,height:size}}>
      {/* 말풍선 1 */}
      <rect x="6" y="8" width="36" height="22" rx="6" fill="#111111"/>
      <path d="M14 30 L10 38 L22 32Z" fill="#111111"/>
      <rect x="12" y="16" width="24" height="3" rx="1.5" fill="white" opacity="0.7"/>
      <rect x="12" y="23" width="16" height="3" rx="1.5" fill="white" opacity="0.5"/>
      {/* 말풍선 2 */}
      <rect x="22" y="34" width="36" height="22" rx="6" fill="#F0F0F0"/>
      <path d="M46 56 L50 62 L38 58Z" fill="#F0F0F0"/>
      <rect x="28" y="42" width="24" height="3" rx="1.5" fill="#C4C4C4"/>
      <rect x="28" y="49" width="16" height="3" rx="1.5" fill="#C4C4C4"/>
    </svg>
  );
}

// ─── 공통 UI ─────────────────────────────────────────────
function Btn({children,variant="primary",onClick,style={},disabled=false}){
  const v={
    primary:{background:C.black,color:C.white,border:"none"},
    outline:{background:C.white,color:C.black,border:`1.5px solid ${C.black}`},
    ghost:  {background:C.gray50,color:C.black,border:`1px solid ${C.border}`},
    danger: {background:C.red,  color:C.white,border:"none"},
    white:  {background:C.white,color:C.black,border:"none"},
  };
  return <button disabled={disabled} onClick={onClick} style={{...v[variant],padding:"10px 20px",borderRadius:6,fontSize:14,fontWeight:700,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.4:1,fontFamily:"inherit",transition:"all 0.15s",...style}}>{children}</button>;
}

function Input({label,required,textarea,...props}){
  const s={width:"100%",padding:"10px 12px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box",background:C.white,color:C.black};
  const h={onFocus:e=>e.target.style.borderColor=C.black,onBlur:e=>e.target.style.borderColor=C.border};
  return(
    <div>
      {label&&<label style={{display:"block",fontSize:13,fontWeight:600,color:C.gray700,marginBottom:5}}>{label}{required&&<span style={{color:C.red}}> *</span>}</label>}
      {textarea?<textarea {...props}{...h} rows={props.rows||4} style={{...s,resize:"vertical"}}/>:<input {...props}{...h} style={s}/>}
    </div>
  );
}

function Card({children,style={},onClick}){
  const [hov,setHov]=useState(false);
  return <div onClick={onClick} onMouseEnter={()=>onClick&&setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:C.white,borderRadius:8,border:`1px solid ${hov?C.gray300:C.border}`,padding:24,transition:"all 0.15s",cursor:onClick?"pointer":"default",...style}}>{children}</div>;
}

function Modal({show,onClose,title,children,maxWidth=480}){
  if(!show)return null;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div style={{background:C.white,borderRadius:10,width:"100%",maxWidth,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 24px 64px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 24px",borderBottom:`1px solid ${C.border}`}}>
          <h2 style={{fontSize:16,fontWeight:800,color:C.black}}>{title}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.gray500,fontFamily:"inherit",lineHeight:1}}>×</button>
        </div>
        <div style={{padding:"20px 24px"}}>{children}</div>
      </div>
    </div>
  );
}

// ─── URL 라우터 ───────────────────────────────────────────
function useRouter(){
  const getPath=()=>{ const h=window.location.hash; return h?h.replace("#",""):"/"; };
  const [path,setPath]=useState(getPath());
  useEffect(()=>{ const h=()=>setPath(getPath()); window.addEventListener("hashchange",h); return()=>window.removeEventListener("hashchange",h); },[]);
  const navigate=to=>{ window.location.hash=to; };
  return {path,navigate};
}

// ─── 인증 모달 ────────────────────────────────────────────
function AuthModal({show,onClose,onLogin}){
  const [mode,setMode]=useState("login");
  const [role,setRole]=useState("participant");
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [err,setErr]=useState("");
  const set=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const submit=()=>{
    if(!form.email||!form.password){setErr("이메일과 비밀번호를 입력해주세요.");return;}
    if(form.email==="admin@researchon.kr"&&form.password==="admin1234"){onLogin({name:"관리자",email:form.email,role:"admin"});onClose();return;}
    if(mode==="signup"&&!form.name){setErr("이름을 입력해주세요.");return;}
    if(mode==="signup"&&form.password!==form.confirm){setErr("비밀번호가 일치하지 않습니다.");return;}
    onLogin({name:mode==="signup"?form.name:form.email.split("@")[0],email:form.email,role});
    onClose();
  };
  return(
    <Modal show={show} onClose={onClose} title={mode==="login"?"로그인":"회원가입"}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:18}}>
        {[{r:"participant",l:"참가자",d:"연구 참여 & 보상"},{r:"researcher",l:"연구자",d:"참가자 모집"}].map(({r,l,d})=>(
          <div key={r} onClick={()=>setRole(r)} style={{padding:"13px 10px",borderRadius:6,border:`1.5px solid ${role===r?C.black:C.border}`,cursor:"pointer",textAlign:"center",background:role===r?C.black:C.white,transition:"all 0.15s"}}>
            <div style={{fontWeight:700,color:role===r?C.white:C.black,fontSize:14,marginBottom:2}}>{l}</div>
            <div style={{fontSize:11,color:role===r?"rgba(255,255,255,0.6)":C.gray500}}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gap:11}}>
        {mode==="signup"&&<Input label="이름" required type="text" placeholder="홍길동" value={form.name} onChange={set("name")}/>}
        <Input label="이메일" required type="email" placeholder="example@email.com" value={form.email} onChange={set("email")}/>
        <Input label="비밀번호" required type="password" placeholder="••••••••" value={form.password} onChange={set("password")}/>
        {mode==="signup"&&<Input label="비밀번호 확인" required type="password" placeholder="••••••••" value={form.confirm} onChange={set("confirm")}/>}
      </div>
      {err&&<p style={{color:C.red,fontSize:12,marginTop:10}}>{err}</p>}
      <div style={{background:C.gray50,borderRadius:6,padding:"9px 12px",marginTop:12,fontSize:11,color:C.gray500,border:`1px solid ${C.border}`}}>관리자: admin@researchon.kr / admin1234</div>
      <Btn onClick={submit} style={{width:"100%",marginTop:14,padding:"12px",fontSize:15}}>{mode==="login"?"로그인":"가입하기"}</Btn>
      <div style={{textAlign:"center",marginTop:12}}>
        <span style={{fontSize:12,color:C.gray500}}>{mode==="login"?"계정이 없으신가요?  ":"이미 계정이 있으신가요?  "}</span>
        <button onClick={()=>{setMode(mode==="login"?"signup":"login");setErr("");}} style={{background:"none",border:"none",color:C.black,fontWeight:700,cursor:"pointer",fontSize:12,fontFamily:"inherit",textDecoration:"underline"}}>{mode==="login"?"회원가입":"로그인"}</button>
      </div>
    </Modal>
  );
}

// ─── 헤더 ─────────────────────────────────────────────────
const NAV_ITEMS = [
  { label:"연구", key:"research", subs:[{label:"진행중인 연구",path:"/research/active"},{label:"종료된 연구",path:"/research/ended"}] },
  { label:"대학원생", key:"graduate", subs:[{label:"진행중인 연구",path:"/graduate/active"},{label:"종료된 연구",path:"/graduate/ended"}] },
  { label:"대학생", key:"undergraduate", subs:[{label:"진행중인 연구",path:"/undergraduate/active"},{label:"종료된 연구",path:"/undergraduate/ended"}] },
  { label:"익명게시판", key:"board", path:"/board" },
];

function Header({path,navigate,user,onLogout,onOpenAuth}){
  const [openMenu,setOpenMenu]=useState(null);
  const [openMobile,setOpenMobile]=useState(false);
  const ref=useRef();
  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpenMenu(null);};
    document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);
  },[]);

  const isActive=(item)=>{
    if(item.path) return path===item.path;
    return item.subs?.some(s=>path.startsWith(s.path.split("/").slice(0,2).join("/")));
  };

  return(
    <header style={{background:C.white,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:300}}>
      {/* 상단 바 */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
        <button onClick={()=>navigate("/")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontFamily:"inherit"}}>
          <div style={{width:26,height:26,background:C.black,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:C.white,fontSize:12}}>R</div>
          <span style={{fontWeight:800,fontSize:15,color:C.black,letterSpacing:"-0.01em"}}>리서치온</span>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {user?.role==="admin"&&<button onClick={()=>navigate("/admin")} style={{background:C.redBg,border:"none",color:C.red,padding:"6px 12px",borderRadius:5,cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>⚙ 관리자</button>}
          {user?.role==="researcher"&&<Btn onClick={()=>navigate("/post")} style={{padding:"7px 14px",fontSize:12}}>연구 등록</Btn>}
          {user?(
            <div style={{display:"flex",alignItems:"center",gap:7,padding:"5px 10px",borderRadius:6,border:`1px solid ${C.border}`}}>
              <div style={{width:22,height:22,background:C.black,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:C.white,fontSize:10}}>{user.name[0]}</div>
              <span style={{fontSize:12,fontWeight:600,color:C.black}}>{user.name}</span>
              <button onClick={onLogout} style={{background:"none",border:"none",color:C.gray300,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>로그아웃</button>
            </div>
          ):(
            <button onClick={onOpenAuth} style={{background:C.black,color:C.white,border:"none",padding:"7px 14px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>로그인</button>
          )}
        </div>
      </div>

      {/* 카테고리 네비 */}
      <div style={{borderTop:`1px solid ${C.border}`,background:C.white}}>
        <div ref={ref} style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",height:44,gap:2}}>
          {NAV_ITEMS.map(item=>(
            <div key={item.key} style={{position:"relative"}}>
              {item.subs?(
                <>
                  <button
                    onMouseEnter={()=>setOpenMenu(item.key)}
                    onClick={()=>setOpenMenu(openMenu===item.key?null:item.key)}
                    style={{background:isActive(item)?C.gray100:"none",border:"none",color:isActive(item)?C.black:C.gray500,padding:"10px 16px",borderRadius:5,cursor:"pointer",fontSize:13,fontWeight:isActive(item)?700:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}
                  >
                    {item.label}
                    <span style={{fontSize:9,color:C.gray300,transform:openMenu===item.key?"rotate(180deg)":"none",transition:"transform 0.15s",display:"inline-block"}}>▼</span>
                  </button>
                  {openMenu===item.key&&(
                    <div onMouseLeave={()=>setOpenMenu(null)} style={{position:"absolute",top:"100%",left:0,background:C.white,border:`1px solid ${C.border}`,borderRadius:8,boxShadow:"0 8px 24px rgba(0,0,0,0.09)",zIndex:200,minWidth:160,overflow:"hidden",marginTop:4}}>
                      {item.subs.map(sub=>(
                        <button key={sub.path} onClick={()=>{navigate(sub.path);setOpenMenu(null);}} style={{display:"block",width:"100%",padding:"11px 18px",background:"none",border:"none",color:path===sub.path?C.black:C.gray500,fontWeight:path===sub.path?700:500,fontSize:13,cursor:"pointer",textAlign:"left",fontFamily:"inherit",borderBottom:`1px solid ${C.gray100}`}}>
                          {sub.label}
                          {path===sub.path&&<span style={{float:"right",color:C.black,fontSize:10}}>●</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ):(
                <button onClick={()=>navigate(item.path)} style={{background:path===item.path?C.black:"none",border:"none",color:path===item.path?C.white:C.gray500,padding:"10px 16px",borderRadius:5,cursor:"pointer",fontSize:13,fontWeight:path===item.path?700:600,fontFamily:"inherit"}}>
                  {item.label}
                </button>
              )}
            </div>
          ))}
          <div style={{marginLeft:"auto",fontSize:12,color:C.gray300}}>
            {user&&<span style={{color:C.gray300}}>({user.role==="researcher"?"연구자":user.role==="admin"?"관리자":"참가자"})</span>}
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── 홈 페이지 ────────────────────────────────────────────
function HomePage({navigate,onOpenAuth,user}){
  return(
    <div>
      {/* 히어로 */}
      <section style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"80px 24px 72px"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <h1 style={{fontSize:"clamp(36px,6vw,64px)",fontWeight:900,color:C.black,lineHeight:1.08,letterSpacing:"-0.03em",marginBottom:40}}>연구자와<br/>참가자를<br/>연결합니다.</h1>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <Btn onClick={()=>navigate("/research/active")} style={{padding:"14px 30px",fontSize:15}}>연구 참여하기</Btn>
            <Btn variant="outline" onClick={user?()=>navigate("/post"):onOpenAuth} style={{padding:"14px 30px",fontSize:15}}>연구 등록하기</Btn>
          </div>
        </div>
      </section>

      {/* 카테고리 카드 */}
      <section style={{padding:"56px 24px",background:C.gray50,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <h2 style={{fontSize:20,fontWeight:800,color:C.black,marginBottom:6}}>무엇을 찾고 계신가요?</h2>
          <p style={{fontSize:13,color:C.gray500,marginBottom:28}}>원하는 카테고리를 선택해주세요.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
            {[
              {icon:<ResearchIcon size={44}/>,title:"연구",desc:"기업·병원·연구기관의 임상시험 및 실험 연구",path:"/research/active"},
              {icon:<GraduateIcon size={44}/>,title:"대학원생",desc:"석·박사 과정 논문을 위한 설문 및 연구",path:"/graduate/active"},
              {icon:<UndergraduateIcon size={44}/>,title:"대학생",desc:"학부 졸업논문·수업 과제를 위한 설문",path:"/undergraduate/active"},
              {icon:<BoardIcon size={44}/>,title:"익명게시판",desc:"연구·실험 참여 경험을 자유롭게 나눠요",path:"/board"},
            ].map(item=>(
              <Card key={item.title} onClick={()=>navigate(item.path)} style={{padding:24,display:"flex",flexDirection:"column",gap:14}}>
                <div style={{width:56,height:56,background:C.gray50,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${C.border}`}}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{fontSize:16,fontWeight:800,color:C.black,marginBottom:5}}>{item.title}</h3>
                  <p style={{fontSize:13,color:C.gray500,lineHeight:1.55}}>{item.desc}</p>
                </div>
                <span style={{fontSize:12,fontWeight:700,color:C.black,marginTop:"auto"}}>바로가기 →</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.black,padding:"60px 24px",textAlign:"center"}}>
        <h2 style={{fontSize:24,fontWeight:900,color:C.white,marginBottom:10,letterSpacing:"-0.02em"}}>연구자이신가요?</h2>
        <p style={{color:"rgba(255,255,255,0.5)",fontSize:15,marginBottom:26,lineHeight:1.7}}>IRB 승인 연구를 등록하고 검증된 참가자를 모집하세요.</p>
        <Btn variant="ghost" onClick={user?()=>navigate("/post"):onOpenAuth} style={{padding:"12px 32px",fontSize:15}}>연구 등록하기 →</Btn>
      </section>

      <footer style={{background:C.black,borderTop:`1px solid #1F1F1F`,padding:"22px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <span style={{color:C.white,fontWeight:800,fontSize:14}}>리서치온 ResearchON</span>
          <span style={{color:C.gray700,fontSize:12}}>© 2026 리서치온 · 개인정보처리방침 · 이용약관</span>
        </div>
      </footer>
    </div>
  );
}

// ─── 연구 목록 페이지 (공통) ──────────────────────────────
function StudyListPage({navigate,user,onOpenAuth,title,subtitle,studies,onPost}){
  const [q,setQ]=useState("");
  const filtered=studies.filter(s=>q===""||s.title.includes(q)||s.institution?.includes(q));

  return(
    <div style={{minHeight:"100vh",background:C.gray50}}>
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"32px 24px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:14}}>
          <div>
            <p style={{fontSize:11,fontWeight:700,color:C.gray300,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>{subtitle}</p>
            <h1 style={{fontSize:22,fontWeight:900,color:C.black}}>{title}</h1>
          </div>
          {user?.role==="researcher"&&<Btn onClick={()=>navigate("/post")} style={{padding:"9px 18px",fontSize:13}}>+ 연구 등록</Btn>}
        </div>
        {studies.length>0&&(
          <div style={{maxWidth:1100,margin:"14px auto 0"}}>
            <div style={{position:"relative",maxWidth:400}}>
              <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:13,color:C.gray300}}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="5" stroke="#C4C4C4" strokeWidth="1.5"/><line x1="10" y1="10" x2="13" y2="13" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </span>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="검색..." style={{width:"100%",padding:"9px 12px 9px 34px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
            </div>
          </div>
        )}
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"22px 24px"}}>
        {filtered.length===0
          ?<EmptyIllustration label={q?"검색 결과가 없어요":"아직 등록된 연구가 없어요"}/>
          :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
            {filtered.map(s=><StudyCard key={s.id} study={s} onClick={()=>navigate(`/study/${s.id}`)}/>)}
          </div>
        }
      </div>
    </div>
  );
}

// ─── 연구 카드 ────────────────────────────────────────────
function StudyCard({study,onClick}){
  const pct=Math.round(study.enrolled/study.needed*100);
  return(
    <Card onClick={onClick} style={{padding:20}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:4,background:C.gray100,color:C.gray700}}>{study.category}</span>
        <span style={{fontSize:15,fontWeight:800,color:C.black}}>₩{study.reward.toLocaleString()}</span>
      </div>
      <h3 style={{fontSize:14,fontWeight:700,color:C.black,marginBottom:5,lineHeight:1.4}}>{study.title}</h3>
      <p style={{fontSize:12,color:C.gray500,marginBottom:12}}>{study.institution}{study.researcher?` · ${study.researcher}`:""}</p>
      <div style={{display:"flex",gap:12,fontSize:12,color:C.gray500,marginBottom:12,flexWrap:"wrap"}}>
        <span>⏱ {study.duration}</span><span>📍 {study.method}</span><span>📅 ~{study.deadline?.slice(5).replace("-","/")}</span>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.gray500,marginBottom:5}}>
        <span>모집 현황</span>
        <span style={{fontWeight:700,color:pct>=80?C.red:C.black}}>{study.enrolled}/{study.needed}명</span>
      </div>
      <div style={{height:4,background:C.gray100,borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:C.black,borderRadius:2}}/></div>
    </Card>
  );
}

// ─── 익명게시판 ───────────────────────────────────────────
function BoardPage(){
  const [posts,setPosts]=useState([]);
  const [showForm,setShowForm]=useState(false);
  const [form,setForm]=useState({title:"",content:"",category:"자유"});
  const [selected,setSelected]=useState(null);
  const [comment,setComment]=useState("");
  const cats=["자유","경험공유","질문","정보","후기"];

  const addPost=()=>{
    if(!form.title||!form.content)return;
    const newPost={id:Date.now(),title:form.title,content:form.content,category:form.category,date:new Date().toLocaleDateString("ko-KR"),views:0,comments:[],likes:0};
    setPosts(p=>[newPost,...p]);
    setForm({title:"",content:"",category:"자유"});
    setShowForm(false);
  };

  const addComment=()=>{
    if(!comment.trim())return;
    setPosts(p=>p.map(post=>post.id===selected.id?{...post,comments:[...post.comments,{id:Date.now(),content:comment,date:new Date().toLocaleDateString("ko-KR")}]}:post));
    setSelected(prev=>({...prev,comments:[...prev.comments,{id:Date.now(),content:comment,date:new Date().toLocaleDateString("ko-KR")}]}));
    setComment("");
  };

  if(selected){
    const fresh=posts.find(p=>p.id===selected.id)||selected;
    return(
      <div style={{minHeight:"100vh",background:C.gray50}}>
        <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"28px 24px 20px"}}>
          <div style={{maxWidth:780,margin:"0 auto"}}>
            <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:C.gray500,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:14}}>← 목록으로</button>
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:4,background:C.gray100,color:C.gray700}}>{fresh.category}</span>
            </div>
            <h1 style={{fontSize:20,fontWeight:900,color:C.black,marginBottom:8}}>{fresh.title}</h1>
            <div style={{fontSize:12,color:C.gray300}}>익명 · {fresh.date} · 조회 {fresh.views}</div>
          </div>
        </div>
        <div style={{maxWidth:780,margin:"0 auto",padding:"24px"}}>
          <Card style={{marginBottom:14,padding:24}}><p style={{fontSize:15,color:C.black,lineHeight:1.8}}>{fresh.content}</p></Card>
          <div style={{marginBottom:14}}>
            <h3 style={{fontSize:14,fontWeight:700,color:C.black,marginBottom:12}}>댓글 {fresh.comments.length}개</h3>
            {fresh.comments.length===0
              ?<div style={{textAlign:"center",padding:"28px",color:C.gray300,fontSize:13}}>첫 댓글을 남겨보세요!</div>
              :fresh.comments.map(c=>(
                <div key={c.id} style={{padding:"14px 0",borderBottom:`1px solid ${C.gray100}`}}>
                  <div style={{fontSize:12,color:C.gray300,marginBottom:5}}>익명 · {c.date}</div>
                  <p style={{fontSize:14,color:C.black,lineHeight:1.6}}>{c.content}</p>
                </div>
              ))
            }
          </div>
          <div style={{display:"flex",gap:9}}>
            <input value={comment} onChange={e=>setComment(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addComment()} placeholder="익명으로 댓글을 작성하세요..." style={{flex:1,padding:"10px 13px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:14,outline:"none",fontFamily:"inherit"}}/>
            <Btn onClick={addComment} style={{padding:"10px 18px",fontSize:13,flexShrink:0}}>등록</Btn>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{minHeight:"100vh",background:C.gray50}}>
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"32px 24px 20px"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:14}}>
          <div>
            <p style={{fontSize:11,fontWeight:700,color:C.gray300,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>ANONYMOUS BOARD</p>
            <h1 style={{fontSize:22,fontWeight:900,color:C.black}}>익명게시판</h1>
          </div>
          <Btn onClick={()=>setShowForm(true)} style={{padding:"9px 18px",fontSize:13}}>+ 글쓰기</Btn>
        </div>
        <div style={{maxWidth:900,margin:"10px auto 0",display:"flex",gap:6,flexWrap:"wrap"}}>
          {cats.map(c=><button key={c} style={{padding:"5px 13px",borderRadius:4,border:`1px solid ${C.border}`,background:C.white,color:C.gray500,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{c}</button>)}
        </div>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"22px 24px"}}>
        {posts.length===0
          ?<BoardEmptyIllustration/>
          :<div style={{background:C.white,borderRadius:8,border:`1px solid ${C.border}`,overflow:"hidden"}}>
            {posts.map((post,i)=>(
              <div key={post.id} onClick={()=>setSelected(post)} style={{padding:"16px 20px",borderBottom:i<posts.length-1?`1px solid ${C.gray100}`:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}} onMouseEnter={e=>e.currentTarget.style.background=C.gray50} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",gap:7,marginBottom:5,alignItems:"center",flexWrap:"wrap"}}>
                    <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:4,background:C.gray100,color:C.gray700,flexShrink:0}}>{post.category}</span>
                    <span style={{fontSize:14,fontWeight:600,color:C.black,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{post.title}</span>
                  </div>
                  <div style={{fontSize:11,color:C.gray300}}>익명 · {post.date} · 댓글 {post.comments.length}</div>
                </div>
                <div style={{fontSize:11,color:C.gray300,flexShrink:0}}>조회 {post.views}</div>
              </div>
            ))}
          </div>
        }
      </div>

      <Modal show={showForm} onClose={()=>setShowForm(false)} title="글쓰기">
        <div style={{display:"grid",gap:13}}>
          <div>
            <label style={{display:"block",fontSize:13,fontWeight:600,color:C.gray700,marginBottom:6}}>카테고리</label>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {cats.map(c=><button key={c} onClick={()=>setForm(p=>({...p,category:c}))} style={{padding:"7px 14px",borderRadius:4,border:`1.5px solid ${form.category===c?C.black:C.border}`,background:form.category===c?C.black:C.white,color:form.category===c?C.white:C.gray500,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{c}</button>)}
            </div>
          </div>
          <Input label="제목" required type="text" placeholder="제목을 입력하세요" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))}/>
          <Input label="내용" required textarea placeholder="자유롭게 작성하세요. 작성자는 익명으로 표시됩니다." value={form.content} onChange={e=>setForm(p=>({...p,content:e.target.value}))} rows={6}/>
          <div style={{background:C.gray50,borderRadius:6,padding:"10px 13px",fontSize:12,color:C.gray500,border:`1px solid ${C.border}`}}>작성자 정보는 저장되지 않으며 완전 익명으로 게시됩니다.</div>
        </div>
        <Btn onClick={addPost} style={{width:"100%",padding:"12px",fontSize:15,marginTop:16}} disabled={!form.title||!form.content}>게시하기</Btn>
      </Modal>
    </div>
  );
}

// ─── 연구 등록 ────────────────────────────────────────────
const STUDY_TYPES=[
  {id:"research",label:"연구 (기업/병원/기관)"},
  {id:"graduate",label:"대학원생"},
  {id:"undergraduate",label:"대학생"},
];

function PostPage({navigate,user,onOpenAuth,onPost}){
  const [form,setForm]=useState({title:"",institution:"",researcher:"",irb:"",reward:"",duration:"",deadline:"",needed:"",category:"",method:"",type:"research",description:"",requirements:"",surveyUrl:""});
  const [done,setDone]=useState(false);
  const set=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const valid=form.title&&form.irb&&form.institution&&form.category&&form.method&&form.description;

  if(!user)return(<div style={{minHeight:"100vh",background:C.gray50,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}><div style={{textAlign:"center"}}><div style={{marginBottom:20,display:"flex",justifyContent:"center"}}><svg viewBox="0 0 80 80" fill="none" style={{width:80}}><circle cx="40" cy="40" r="36" fill="#F0F0F0"/><rect x="28" y="32" width="24" height="18" rx="3" fill="white" stroke="#DEDEDE" strokeWidth="2"/><rect x="34" y="26" width="12" height="9" rx="3" fill="#DEDEDE"/><circle cx="40" cy="41" r="3" fill="#C4C4C4"/></svg></div><h2 style={{fontWeight:800,color:C.black,marginBottom:10,fontSize:18}}>로그인이 필요합니다</h2><Btn onClick={onOpenAuth} style={{padding:"11px 28px"}}>로그인</Btn></div></div>);
  if(done)return(<div style={{minHeight:"100vh",background:C.gray50,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}><Card style={{maxWidth:420,width:"100%",textAlign:"center",padding:44}}><div style={{marginBottom:16,display:"flex",justifyContent:"center"}}><svg viewBox="0 0 80 80" fill="none" style={{width:80}}><circle cx="40" cy="40" r="36" fill="#DCFCE7"/><polyline points="24,40 34,52 56,28" stroke="#166534" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg></div><h2 style={{fontWeight:900,color:C.black,fontSize:20,marginBottom:10}}>등록 신청 완료!</h2><p style={{color:C.gray500,lineHeight:1.8,fontSize:14,marginBottom:24}}>IRB 승인번호 확인 후 24시간 내 게시됩니다.</p><Btn onClick={()=>{setDone(false);navigate("/dashboard");}}>대시보드에서 확인</Btn></Card></div>);

  return(
    <div style={{minHeight:"100vh",background:C.gray50}}>
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"32px 24px 20px"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <h1 style={{fontSize:22,fontWeight:900,color:C.black,marginBottom:5}}>연구 등록</h1>
          <p style={{color:C.gray500,fontSize:13}}>IRB 승인을 받은 연구만 등록 가능합니다.</p>
        </div>
      </div>
      <div style={{maxWidth:700,margin:"0 auto",padding:"24px"}}>
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:13,fontWeight:600,color:C.gray700,marginBottom:8}}>연구자 유형 <span style={{color:C.red}}>*</span></label>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {STUDY_TYPES.map(t=><button key={t.id} onClick={()=>setForm(p=>({...p,type:t.id}))} style={{padding:"9px 18px",borderRadius:6,border:`1.5px solid ${form.type===t.id?C.black:C.border}`,background:form.type===t.id?C.black:C.white,color:form.type===t.id?C.white:C.gray500,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{t.label}</button>)}
          </div>
        </div>
        <Card>
          <div style={{display:"grid",gap:13}}>
            <Input label="연구 제목" required type="text" placeholder="연구 제목을 입력하세요" value={form.title} onChange={set("title")}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
              <Input label="소속 기관/학교" required type="text" placeholder="예: 서울대학교 심리학과" value={form.institution} onChange={set("institution")}/>
              <Input label="연구 책임자" type="text" placeholder="예: 홍길동 교수" value={form.researcher} onChange={set("researcher")}/>
            </div>
            <Input label="IRB 승인번호" required type="text" placeholder="예: SNU-IRB-2026-001" value={form.irb} onChange={set("irb")}/>
            {(form.type==="graduate"||form.type==="undergraduate")&&(
              <div>
                <Input label="설문지 URL (선택)" type="url" placeholder="https://forms.gle/..." value={form.surveyUrl} onChange={set("surveyUrl")}/>
                <p style={{fontSize:11,color:C.gray500,marginTop:4}}>구글폼, 네이버폼 등의 링크를 입력하면 참가자가 바로 응답할 수 있어요.</p>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
              <Input label="보상금 (원, 없으면 0)" type="number" placeholder="예: 5000" value={form.reward} onChange={set("reward")}/>
              <Input label="모집 인원" type="number" placeholder="예: 100" value={form.needed} onChange={set("needed")}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
              <Input label="소요 시간" type="text" placeholder="예: 약 15분" value={form.duration} onChange={set("duration")}/>
              <Input label="모집 마감일" type="date" value={form.deadline} onChange={set("deadline")}/>
            </div>
            <div>
              <label style={{display:"block",fontSize:13,fontWeight:600,color:C.gray700,marginBottom:5}}>분야 <span style={{color:C.red}}>*</span></label>
              <select value={form.category} onChange={set("category")} style={{width:"100%",padding:"10px 12px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:14,fontFamily:"inherit",background:C.white}}>
                <option value="">선택</option>
                {["심리학","의학","경영학","사회학","HCI","공학","약학","화장품","교육학","간호학","기타"].map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{display:"block",fontSize:13,fontWeight:600,color:C.gray700,marginBottom:6}}>진행 방식 <span style={{color:C.red}}>*</span></label>
              <div style={{display:"flex",gap:7}}>
                {["온라인","대면","혼합"].map(m=><button key={m} onClick={()=>setForm(p=>({...p,method:m}))} style={{flex:1,padding:"9px",borderRadius:6,border:`1.5px solid ${form.method===m?C.black:C.border}`,background:form.method===m?C.black:C.white,color:form.method===m?C.white:C.gray500,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{m}</button>)}
              </div>
            </div>
            <Input label="연구 설명" required textarea placeholder="연구 목적, 절차, 참가 방법을 상세히 작성해주세요." value={form.description} onChange={set("description")} rows={5}/>
            <Input label="참가 조건 (줄바꿈으로 구분)" textarea placeholder={"예: 만 18세~35세\n재학 중인 학부생"} value={form.requirements} onChange={set("requirements")} rows={3}/>
          </div>
          <div style={{background:C.gray50,borderRadius:6,padding:"11px 14px",margin:"16px 0",border:`1px solid ${C.border}`,display:"flex",gap:8}}>
            <span style={{fontSize:14}}>ℹ️</span><p style={{fontSize:12,color:C.gray700,lineHeight:1.65,margin:0}}>IRB 승인번호는 등록 전 반드시 확인됩니다. 허위 등록 시 계정이 정지될 수 있습니다.</p>
          </div>
          <Btn onClick={()=>{if(valid){onPost({...form,reward:parseInt(form.reward)||0,needed:parseInt(form.needed)||0,enrolled:0});setDone(true);}}} style={{width:"100%",padding:14,fontSize:15}} disabled={!valid}>등록 신청하기 →</Btn>
        </Card>
      </div>
    </div>
  );
}

// ─── 관리자 패널 (간소화) ─────────────────────────────────
function AdminPage({studies,navigate}){
  const [tab,setTab]=useState("overview");
  const [users]=useState([{id:1,name:"관리자",email:"admin@researchon.kr",role:"admin",joined:"2026-06-01",status:"활성"}]);
  const [pending,setPending]=useState([]);

  return(
    <div style={{minHeight:"100vh",background:C.gray50}}>
      <div style={{background:C.black,padding:"24px 24px 18px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:34,height:34,background:C.red,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>⚙</div>
          <div><h1 style={{fontSize:18,fontWeight:900,color:C.white}}>관리자 패널</h1><p style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>ResearchON Admin</p></div>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"22px 24px"}}>
        <div style={{display:"flex",gap:0,marginBottom:20,background:C.white,borderRadius:6,border:`1px solid ${C.border}`,width:"fit-content",overflow:"hidden"}}>
          {[{k:"overview",l:"전체 현황"},{k:"users",l:"회원 관리"},{k:"approval",l:`연구 승인 (${pending.length})`},{k:"revenue",l:"수익 현황"}].map((t,i,arr)=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"10px 18px",borderRight:i<arr.length-1?`1px solid ${C.border}`:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:700,background:tab===t.k?C.black:C.white,color:tab===t.k?C.white:C.gray500,fontFamily:"inherit"}}>{t.l}</button>
          ))}
        </div>

        {tab==="overview"&&(
          <div style={{display:"grid",gap:14}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>
              {[{l:"총 회원",v:`${users.length}명`},{l:"총 연구",v:`${studies.length}건`},{l:"승인 대기",v:`${pending.length}건`},{l:"이번 달 수익",v:"₩0"}].map((s,i)=>(
                <Card key={i} style={{padding:"16px 14px",textAlign:"center"}}>
                  <div style={{fontSize:20,fontWeight:900,color:C.black}}>{s.v}</div>
                  <div style={{fontSize:12,color:C.gray500,marginTop:4}}>{s.l}</div>
                </Card>
              ))}
            </div>
            <Card style={{textAlign:"center",padding:44}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
                <svg viewBox="0 0 120 100" fill="none" style={{width:100}}><rect x="10" y="30" width="100" height="60" rx="6" fill="#F0F0F0"/><rect x="20" y="42" width="30" height="8" rx="3" fill="#DEDEDE"/><rect x="20" y="56" width="22" height="8" rx="3" fill="#DEDEDE"/><rect x="60" y="42" width="40" height="8" rx="3" fill="#DEDEDE"/><rect x="60" y="56" width="30" height="8" rx="3" fill="#DEDEDE"/><rect x="30" y="10" width="60" height="28" rx="4" fill="#E5E5E5"/><text x="60" y="29" textAnchor="middle" fontSize="13" fontWeight="700" fill="#737373" fontFamily="sans-serif">준비 중</text></svg>
              </div>
              <p style={{fontSize:14,color:C.gray500}}>아직 데이터가 없어요. 연구가 등록되면 여기서 확인할 수 있어요.</p>
            </Card>
          </div>
        )}
        {tab==="users"&&<Card style={{textAlign:"center",padding:44}}><p style={{color:C.gray500}}>현재 회원: 관리자 1명</p></Card>}
        {tab==="approval"&&<Card style={{textAlign:"center",padding:44}}><p style={{color:C.gray500}}>승인 대기 중인 연구가 없어요. ✅</p></Card>}
        {tab==="revenue"&&<Card style={{textAlign:"center",padding:44}}><p style={{color:C.gray500}}>아직 수익 데이터가 없어요. 서비스가 시작되면 여기서 확인할 수 있어요.</p></Card>}
      </div>
    </div>
  );
}

// ─── 메인 앱 ─────────────────────────────────────────────
export default function App(){
  const {path,navigate}=useRouter();
  const [user,setUser]=useState(null);
  const [showAuth,setShowAuth]=useState(false);
  const [studies,setStudies]=useState([]);
  const [applied,setApplied]=useState([]);

  const parts=path.split("/").filter(Boolean);
  const seg0=parts[0]||"";
  const seg1=parts[1]||"";

  const getStudies=(type,status)=>{
    return studies.filter(s=>{
      const typeMatch = s.type===type;
      const statusMatch = status==="active"?s.enrolled<s.needed:s.enrolled>=s.needed;
      return typeMatch&&statusMatch;
    });
  };

  const renderPage=()=>{
    switch(true){
      case seg0===""||seg0==="home":
        return <HomePage navigate={navigate} onOpenAuth={()=>setShowAuth(true)} user={user}/>;
      case seg0==="research"&&seg1==="active":
        return <StudyListPage navigate={navigate} user={user} onOpenAuth={()=>setShowAuth(true)} title="진행중인 연구" subtitle="RESEARCH · ACTIVE" studies={getStudies("research","active")}/>;
      case seg0==="research"&&seg1==="ended":
        return <StudyListPage navigate={navigate} user={user} onOpenAuth={()=>setShowAuth(true)} title="종료된 연구" subtitle="RESEARCH · ENDED" studies={getStudies("research","ended")}/>;
      case seg0==="graduate"&&seg1==="active":
        return <StudyListPage navigate={navigate} user={user} onOpenAuth={()=>setShowAuth(true)} title="진행중인 연구" subtitle="GRADUATE · ACTIVE" studies={getStudies("graduate","active")}/>;
      case seg0==="graduate"&&seg1==="ended":
        return <StudyListPage navigate={navigate} user={user} onOpenAuth={()=>setShowAuth(true)} title="종료된 연구" subtitle="GRADUATE · ENDED" studies={getStudies("graduate","ended")}/>;
      case seg0==="undergraduate"&&seg1==="active":
        return <StudyListPage navigate={navigate} user={user} onOpenAuth={()=>setShowAuth(true)} title="진행중인 연구" subtitle="UNDERGRADUATE · ACTIVE" studies={getStudies("undergraduate","active")}/>;
      case seg0==="undergraduate"&&seg1==="ended":
        return <StudyListPage navigate={navigate} user={user} onOpenAuth={()=>setShowAuth(true)} title="종료된 연구" subtitle="UNDERGRADUATE · ENDED" studies={getStudies("undergraduate","ended")}/>;
      case seg0==="board":
        return <BoardPage/>;
      case seg0==="post":
        return <PostPage navigate={navigate} user={user} onOpenAuth={()=>setShowAuth(true)} onPost={d=>setStudies(p=>[{...d,id:Date.now(),enrolled:0},...p])}/>;
      case seg0==="admin":
        return user?.role==="admin"?<AdminPage studies={studies} navigate={navigate}/>:<div style={{padding:48,textAlign:"center",color:C.red,fontWeight:700}}>관리자 권한이 필요합니다.</div>;
      default:
        return <div style={{padding:64,textAlign:"center"}}><h2 style={{fontSize:20,fontWeight:800,marginBottom:16,color:C.black}}>페이지를 찾을 수 없어요</h2><Btn onClick={()=>navigate("/")}>홈으로</Btn></div>;
    }
  };

  return(
    <div style={{fontFamily:"'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif",color:C.black}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        button{font-family:inherit;}
        button:hover{opacity:0.86;}
        button:active{transform:scale(0.98);}
        input:focus,textarea:focus,select:focus{border-color:#111 !important;box-shadow:0 0 0 2px rgba(17,17,17,0.07);}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:#E0E0E0;border-radius:2px;}
      `}</style>
      <Header path={path} navigate={navigate} user={user} onLogout={()=>{setUser(null);navigate("/");}} onOpenAuth={()=>setShowAuth(true)}/>
      {renderPage()}
      <AuthModal show={showAuth} onClose={()=>setShowAuth(false)} onLogin={u=>{setUser(u);setShowAuth(false);}}/>
    </div>
  );
}

