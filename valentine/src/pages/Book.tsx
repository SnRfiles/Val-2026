import { useState } from 'react'

type BookProps = {
  onReset: () => void
}

export default function Book({ onReset }: BookProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageTransition, setPageTransition] = useState<{
    from: number
    to: number
    direction: 'next' | 'prev'
  } | null>(null)

  const pages = [
    {
      title: 'My Roaya',
      body:
        "Roaya, throughout all this time I’ve known you. There has never been a passing day where I wasn’t amazed by you. Whether it’s by a picture you sent, the words you spoke, or by seeing you standing infront of me. No matter what it is, You are always showing me how perfect you are. Every time I think about you, I feel a sense of happiness. I want to express it but no matter how deeply or elegantly I speak about you it is never enough to express how truly beautiful you are. Not just in your looks but in every possible standard. That doesn’t go to say that I shouldn’t try, so that I might get close. You deserve the best, and I will give you my best everyday until the day I die."
    },
    {
      title: 'Your Eyes',
      body:
        "Your eyes were the first thing I ever complimented you on and even though they might not be the last thing I compliment. I will forever continue to completely adore and admire them. Your eyes are not just any eyes. They are the first thing I see when you come to mind. The way your eyes sparkle when you talk to me about something you love, I wish to see it for all my life. The depth of your eyes are deeper than the deepest part of the ocean. They hold the most beautiful shade of brown. It’s the color I need, the color I want to look into for the rest of my life, from the moment I wake up, to the moment I fall asleep, until the day I die. I don’t need the world, all I want is for your eyes to keep finding me in every crowd. If it’s your gaze I could live in it forever."
    },
    {
      title: 'Your Smile',
      body:
        "Your smile is my smile, if there is ever a time you’re smiling I can ensure you I will be too. Your smile brings warmth and a calm atmosphere that can never be matched. It’s not just any smile, it shows your happiness and your happiness is more valuable than anything else no matter the time, place, or situation. When you smile, everything around starts to shine, everything becomes joyful. Your smile brings a reason to be motivated, the reason to keep my heart beating (even if it skips a beat when I do see it), it is to live for but also to die for. Your smile gave me motivation in life so that I can always keep you happy, so I can continue to see it. I hope I can be the reason you smile. (: "
    },
    {
      title: 'Your Voice',
      body:
        "Your voice and your laugh are enough to put anyone into a trance (especially me). I could be in the depths of jail (lols), going through the worst time of my life, living through hell but as soon as I hear your beautiful voice and listen to your laugh it’s as if nothing else matters anymore. All the negative things becomes insignificant. Your beautiful tone it’s like a melody, I could listen to you speak for days on end and still want to hear you talk more. From when I first heard your voice to when I hear it now, it has always brought peace to me. When you laugh, life is perfect. Your speech is so well put together, it’s never struggle to understand your words as you tell a story (unless it’s on the phone because it wants to cut out or something wants to go wrong 🙄). Your voice is especially captivating when you speak excitedly about your passions, the things you enjoy, and your plans. I will always listen attentively to your words not just because of how clear and beautiful for voice is but also so that I can make your words come to reality. "
    },
    {
      title: 'Your Beauty',
      body:
        "There are no bounds on how beautiful you are, from top to bottom, inside and out you are absolutely gorgeous. From the color of your eyes, the sound of your voice, the shape of your nose, and even the cute way you walk taking each step. Every part of you is beautiful whether it’s what you are or the things you do, you bring beauty into it. Those things are only part of your beauty, you are beautiful in all ways. You’re beautiful for the way you think, for the way you can make others smile even when you’re sad. You aren’t just beautiful in temporary ways like your looks. You are beautiful down to the core, deep down to your soul, to the beating of your heart. Your patience when it’s hard to be patient, your kind words and happiness when you yourself are sad, your strive to always be better when you’re already the best. All of it is beautiful, you are the the definition."
    },
    {
      title: 'Always You',
      body:
        "Roaya, I can continue to talk about you for days on end and it still wouldn’t be enough. You’re completely indescribable, ineffable. Still, I will continue to find new ways to express, not only I feel about you, but who you truly are. You are the best thing that could have happened to me. I met you on a random day and now I need you with me until my last day. We may not be married yet, but when that day comes my efforts will only increase, I will be the best I can for you every passing day even more than now. Many can say they will die for you, but I won’t just die for you but also live for you, everyday. Living for you doesn’t mean getting through the day, it’s mean doing my best for you and giving you everything you deserve. Keeping a smile on your face, keeping the sparkle in your eyes, happiness in your mind, and love in your heart. I could not imagine a future where I am not with you. All of my goals, imaginations, and visions are with you."
    },
    {
      title: 'Always You',
      body:
        "If someday I am no longer allowed to see you, I no longer want to see. If my heart is not beating for you, I don’t want it to beat at all. If my smile isn’t for you I don’t want to smile. If my hands can never hold yours then I want them to remain empty. If I were asked to tell the world how much you mean to me, I would whisper it into your ear. If it is not you than it's no one.I will always be for you, and it will always be only you.",
      signature: "- Sheraz"
    }
  ]

  const page = pages[pageIndex]
  const closeDurationMs = 2900
  const pageAnimMs = 420
  const isAnimatingPage = pageTransition !== null

  return (
    <div className="page book">
      <div className="floating-hearts" aria-hidden="true">
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
      </div>

      <div className="letter-stage">
        <h1>From Me To You</h1>
        <p className="subtitle">Tap the envelope to open it.</p>

        <div className="envelope-wrap">
          <div
            className={['envelope', isOpen ? 'is-open' : '', isClosing ? 'is-closing' : '']
              .join(' ')
              .trim()}
            onClick={() => {
              if (!isOpen && !isClosing) setIsOpen(true)
            }}
            onKeyDown={(event) => {
              if (!isOpen && !isClosing && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault()
                setIsOpen(true)
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
          >
            <span className="letter-paper">
              <span className="letter-paper__sheet" />
              <span className="letter-paper__fold" />
              <span className="letter-paper__crease" />
              <div className="letter-pages" aria-live="polite" aria-atomic="true">
                {pageTransition ? (
                  <>
                    <div className="letter-content page-out">
                      <h2 className="letter-title">{pages[pageTransition.from].title}</h2>
                      <p className="letter-body">{pages[pageTransition.from].body}</p>
                      {pages[pageTransition.from].signature ? (
                        <p className="letter-signature">{pages[pageTransition.from].signature}</p>
                      ) : null}
                    </div>
                    <div className="letter-content page-in">
                      <h2 className="letter-title">{pages[pageTransition.to].title}</h2>
                      <p className="letter-body">{pages[pageTransition.to].body}</p>
                      {pages[pageTransition.to].signature ? (
                        <p className="letter-signature">{pages[pageTransition.to].signature}</p>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <div className="letter-content">
                    <h2 className="letter-title">{page.title}</h2>
                    <p className="letter-body">{page.body}</p>
                    {page.signature ? <p className="letter-signature">{page.signature}</p> : null}
                  </div>
                )}
              </div>
              <button
                type="button"
                className={['letter-nav', 'letter-nav--prev', isOpen ? 'is-visible' : ''].join(' ')}
                onClick={(event) => {
                  event.stopPropagation()
                  if (isAnimatingPage) return
                  const nextIndex = Math.max(0, pageIndex - 1)
                  if (nextIndex === pageIndex) return
                  setPageTransition({ from: pageIndex, to: nextIndex, direction: 'prev' })
                  window.setTimeout(() => {
                    setPageIndex(nextIndex)
                    setPageTransition(null)
                  }, pageAnimMs)
                }}
                disabled={pageIndex === 0 || isAnimatingPage}
                aria-label="Previous page"
              >
                ‹
              </button>
              <button
                type="button"
                className={['letter-nav', 'letter-nav--next', isOpen ? 'is-visible' : ''].join(' ')}
                onClick={(event) => {
                  event.stopPropagation()
                  if (isAnimatingPage) return
                  const nextIndex = Math.min(pages.length - 1, pageIndex + 1)
                  if (nextIndex === pageIndex) return
                  setPageTransition({ from: pageIndex, to: nextIndex, direction: 'next' })
                  window.setTimeout(() => {
                    setPageIndex(nextIndex)
                    setPageTransition(null)
                  }, pageAnimMs)
                }}
                disabled={pageIndex === pages.length - 1 || isAnimatingPage}
                aria-label="Next page"
              >
                ›
              </button>
              <button
                type="button"
                className={['letter-close', isOpen ? 'is-visible' : ''].join(' ')}
                onClick={(event) => {
                  event.stopPropagation()
                  if (isClosing) return
                  setIsClosing(true)
                  window.setTimeout(() => {
                    setIsOpen(false)
                    setIsClosing(false)
                    setPageIndex(0)
                    setPageTransition(null)
                  }, closeDurationMs)
                }}
                aria-label="Close letter"
              >
                ×
              </button>
            </span>
            <span className="envelope__back" aria-hidden="true" />
            <span className="envelope__flap" aria-hidden="true" />
            <span className="envelope__body" aria-hidden="true" />
          </div>
        </div>

        <button type="button" className="btn btn--primary back-link" onClick={onReset}>
          Back to calendar
        </button>
      </div>
    </div>
  )
}
