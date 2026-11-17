import React,{useRef,useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function RoyalScroll({title,children}){
 const ref=useRef(null);
 useEffect(()=>{
  const root=ref.current;
  const ctx=gsap.context(()=>{
   const mm=gsap.matchMedia();
   mm.add('(prefers-reduced-motion: no-preference)',()=>{
    const top=root.querySelector('.royal-top'),bottom=root.querySelector('.royal-bottom'),paper=root.querySelector('.royal-paper'),content=root.querySelector('.royal-content');
    const travel=()=>Math.min(185,Math.max(95,paper.getBoundingClientRect().height*.31));
    gsap.set(paper,{clipPath:'inset(49% 0 49% 0)'});
    gsap.set(content,{opacity:0,y:24});
    gsap.timeline({scrollTrigger:{trigger:root,start:'top 82%',end:'center 44%',scrub:.65,invalidateOnRefresh:true}})
      .fromTo(top,{y:()=>travel()},{y:0,ease:'none'},0)
      .fromTo(bottom,{y:()=>-travel()},{y:0,ease:'none'},0)
      .to(paper,{clipPath:'inset(0% 0 0% 0)',ease:'none'},0)
      .to(content,{opacity:1,y:0,duration:.42,ease:'power1.out'},.52);
    return ()=>{gsap.set([top,bottom,paper,content],{clearProps:'all'});};
   });
   return ()=>mm.revert();
  },root);
  return ()=>ctx.revert();
 },[]);
 return <section className="royal-scene" ref={ref} aria-label={title}><div className="royal-stage"><div className="royal-scroll"><div className="royal-roller royal-top" aria-hidden="true"><span className="royal-cap"/><span className="royal-cylinder"/><span className="royal-cap"/></div><div className="royal-paper"><div className="royal-border"><div className="royal-content"><div className="royal-flourish" aria-hidden="true">❧ ✦ ❧</div><h2>{title}</h2>{children}<div className="royal-flourish" aria-hidden="true">❧ ✦ ❧</div></div></div></div><div className="royal-roller royal-bottom" aria-hidden="true"><span className="royal-cap"/><span className="royal-cylinder"/><span className="royal-cap"/></div></div></div></section>;
}