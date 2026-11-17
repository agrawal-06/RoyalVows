import React,{useRef,useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {wedding as w} from '../data/weddingConfig';
gsap.registerPlugin(ScrollTrigger);
export default function PalaceReveal(){
 const ref=useRef(null);
 useEffect(()=>{
  const root=ref.current;
  const ctx=gsap.context(()=>{
   const mm=gsap.matchMedia();
   mm.add('(prefers-reduced-motion: no-preference)',()=>{
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:'top bottom',end:'bottom top',scrub:.9,invalidateOnRefresh:true}});
    tl.fromTo('.palace-sky',{scale:1.1,y:30},{scale:1,y:-25,ease:'none'},0)
      .fromTo('.palace-architecture',{scale:.92,y:55},{scale:1.04,y:-20,ease:'none'},0)
      .fromTo('.palace-overlay',{opacity:.2},{opacity:.78,ease:'none'},.28);
    return ()=>tl.kill();
   });
   return ()=>mm.revert();
  },root);
  return ()=>ctx.revert();
 },[]);
 return <section className="palace-cinema" ref={ref} aria-label="Royal palace venue reveal"><div className="palace-sky" aria-hidden="true"/><div className="palace-architecture" aria-hidden="true"><div className="palace-wing left"/><div className="palace-wing right"/><div className="palace-dome"/><div className="palace-columns">{Array.from({length:7},(_,i)=><span key={i}/>)}</div><div className="mandap"><div className="mandap-roof"/><div className="mandap-pillars"><i/><i/></div></div><div className="palace-water"/></div><div className="palace-overlay" aria-hidden="true"/><div className="palace-caption"><p className="eyebrow">Where forever begins</p><h2>A Royal Celebration</h2><p>{w.venue}</p><a href={w.mapsUrl} target="_blank" rel="noopener noreferrer">Explore the Venue ↗</a></div></section>;
}