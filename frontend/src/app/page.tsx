const magazines = [
  {
    title: "Midnight Letters",
    issue: "Issue No. 01",
    description: "Poetry, short fiction and visual stories from emerging voices.",
  },
  {
    title: "The Quiet Room",
    issue: "Issue No. 02",
    description: "A collection about memory, solitude and forgotten places.",
  },
  {
    title: "After the Rain",
    issue: "Issue No. 03",
    description: "New writing and visual work inspired by change and renewal.",
  },
];

const posts = [
  {
    type: "Poem",
    title: "The Last Letter",
    author: "Luzia",
  },
  {
    type: "Short Story",
    title: "A Room Without Clocks",
    author: "Mira Vale",
  },
  {
    type: "Photography",
    title: "Blue Hour",
    author: "Elian North",
  },
];

const museums = [
  {
    title: "Museum of Unsent Letters",
    curator: "Curated by Luzia",
  },
  {
    title: "Fragments of Summer",
    curator: "Curated by Mira Vale",
  },
  {
    title: "Archive of Small Things",
    curator: "Curated by Elian North",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <header className="border-b border-stone-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
              Digital Literature & Art
            </p>
            <h1 className="mt-1 font-serif text-2xl">Literary Museum</h1>
          </div>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#">Home</a>
            <a href="#">Explore</a>
            <a href="#">Magazines</a>
            <a href="#">Museums</a>
          </nav>

          <button className="rounded-full border border-stone-900 px-5 py-2 text-sm">
            Sign In
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-stone-500">
            Featured Collection
          </p>

          <h2 className="max-w-4xl font-serif text-5xl leading-tight md:text-7xl">
            A place where stories become collections.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
            Discover independent magazines, original works and personal digital
            museums built by writers, photographers and artists.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-full bg-stone-950 px-6 py-3 text-sm text-white">
              Start Exploring
            </button>

            <button className="rounded-full border border-stone-300 px-6 py-3 text-sm">
              Create Your Museum
            </button>
          </div>
        </div>

        <div className="min-h-72 rounded-[2rem] bg-stone-900 p-8 text-stone-100">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
            Editor&apos;s Selection
          </p>

          <div className="mt-24">
            <p className="text-sm text-stone-400">This Week</p>
            <h3 className="mt-2 font-serif text-4xl">Letters We Never Sent</h3>
            <p className="mt-4 max-w-md leading-7 text-stone-300">
              A curated selection of poetry, photography and short prose about
              memory and absence.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Read
            </p>
            <h2 className="mt-2 font-serif text-4xl">Latest Magazines</h2>
          </div>

          <a href="#" className="text-sm underline underline-offset-4">
            View all
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {magazines.map((magazine) => (
            <article
              key={magazine.title}
              className="rounded-3xl border border-stone-200 bg-white p-7"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                {magazine.issue}
              </p>

              <h3 className="mt-12 font-serif text-3xl">{magazine.title}</h3>

              <p className="mt-4 leading-7 text-stone-600">
                {magazine.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Discover
            </p>
            <h2 className="mt-2 font-serif text-4xl">Trending Works</h2>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {posts.map((post) => (
              <article
                key={post.title}
                className="grid gap-3 py-7 md:grid-cols-[150px_1fr_200px] md:items-center"
              >
                <p className="text-sm text-stone-500">{post.type}</p>
                <h3 className="font-serif text-2xl">{post.title}</h3>
                <p className="text-sm text-stone-500 md:text-right">
                  by {post.author}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Collections
          </p>
          <h2 className="mt-2 font-serif text-4xl">Museums to Explore</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {museums.map((museum, index) => (
            <article
              key={museum.title}
              className="flex min-h-80 flex-col justify-end rounded-[2rem] bg-stone-200 p-7"
            >
              <p className="text-sm text-stone-500">
                Museum {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-2 font-serif text-3xl">{museum.title}</h3>

              <p className="mt-3 text-sm text-stone-600">{museum.curator}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-stone-500 md:flex-row md:justify-between">
          <p>Literary Museum</p>
          <p>Stories. Magazines. Museums.</p>
        </div>
      </footer>
    </main>
  );
}