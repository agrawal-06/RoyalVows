import React,{useRef,useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const frames=[['The Beginning','The first chapter'],['A Beautiful Journey','Every moment together'],['Forever Together','Our next adventure'],['Our Promise','To a lifetime of love']];
export default function StoryGallery(){
 const ref=useRef(null);
 useEffect(()=>{
  const root=ref.current;
  const ctx=gsap.context(()=>{
   const mm=gsap.matchMedia();
   mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)',()=>{
    const track=root.querySelector('.gallery-track');
    const distance=()=>Math.max(0,track.scrollWidth-root.clientWidth);
    const tween=gsap.to(track,{x:()=>-distance(),ease:'none',scrollTrigger:{trigger:root,start:'top top',end:()=>'+='+Math.max(600,distance()),pin:true,scrub:.8,invalidateOnRefresh:true}});
    return ()=>{tween.kill();gsap.set(track,{clearProps:'transform'});};
   });
   mm.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)',()=>{
    gsap.utils.toArray('.gallery-frame',root).forEach(frame=>gsap.fromTo(frame,{opacity:.45,y:45},{opacity:1,y:0,scrollTrigger:{trigger:frame,start:'top 95%',end:'top 65%',scrub:.5}}));
   });
   return ()=>mm.revert();
  },root);
  return ()=>ctx.revert();
 },[]);
 return <section className="gallery-scene" ref={ref} aria-label="Wedding photo gallery"><p className="eyebrow">Our Story</p><h2>Moments to Treasure</h2><div className="gallery-track">{frames.map(([name,caption],i)=><figure className="gallery-frame" key={name}><div className="gallery-cord" aria-hidden="true"/><div className="gallery-art"><div className="gallery-photo" role="img" aria-label={name+' — photo placeholder'}><span>Photo {String(i+1).padStart(2,'0')}</span></div></div><figcaption><strong>{name}</strong><span>{caption}</span></figcaption></figure>)}</div></section>;
}