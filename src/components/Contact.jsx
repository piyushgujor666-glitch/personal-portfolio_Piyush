import { useState } from 'react'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
import { profile } from '../data/resume'
import ExternalLink from './ExternalLink'
import Reveal, { SectionHeader } from './Reveal'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!emailRe.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (v.subject.trim().length < 3) e.subject = 'Please add a subject.'
  if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.'
  return e
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null)

  const change = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      setFeedback({ ok: false, text: 'Please fix the highlighted fields and try again.' })
      return
    }
    const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`
    try {
      window.location.href = href
      setFeedback({ ok: true, text: 'Your email app should now open with the message pre-filled. The message is only sent once you press Send there. If nothing opened, email me directly using the link on this page.' })
    } catch {
      setFeedback({ ok: false, text: `Couldn't open your email app. Please write to ${profile.email} directly.` })
    }
  }

  const field = (id, label, props = {}) => (
    <label htmlFor={id}>
      {label}
      {props.multiline ? (
        <textarea id={id} className="field" value={values[id]} onChange={change(id)} aria-invalid={Boolean(errors[id])} aria-describedby={errors[id] ? `${id}-err` : undefined} />
      ) : (
        <input id={id} className="field" type={props.type || 'text'} autoComplete={props.autoComplete} value={values[id]} onChange={change(id)} aria-invalid={Boolean(errors[id])} aria-describedby={errors[id] ? `${id}-err` : undefined} />
      )}
      {errors[id] && <span id={`${id}-err`} className="err">{errors[id]}</span>}
    </label>
  )

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader eyebrow="Contact" title="Let's talk" sub="Open to internships and frontend or full-stack opportunities." />
        <div className="contact-grid">
          <Reveal className="contact-info">
            <a className="glass contact-link" href={`mailto:${profile.email}`}><Mail size={20} /><div><small>Email</small><span>{profile.email}</span></div></a>
            <ExternalLink className="glass contact-link" href={profile.github}><Github size={20} /><div><small>GitHub</small><span>piyushgujor666-glitch</span></div></ExternalLink>
            <ExternalLink className="glass contact-link" href={profile.linkedin}><Linkedin size={20} /><div><small>LinkedIn</small><span>Piyush Gujor</span></div></ExternalLink>
          </Reveal>
          <Reveal delay={0.1}>
            <form className="glass form" onSubmit={submit} noValidate>
              {field('name', 'Name', { autoComplete: 'name' })}
              {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
              {field('subject', 'Subject')}
              {field('message', 'Message', { multiline: true })}
              <button type="submit" className="btn btn-primary"><Send size={16} /> Open in Email App</button>
              <p className="form-note">This site has no mail server. Submitting opens your email app with the message pre-filled; nothing is sent until you send it there.</p>
              <div aria-live="polite">{feedback && <p className={`alert ${feedback.ok ? 'ok' : 'bad'}`}>{feedback.text}</p>}</div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
