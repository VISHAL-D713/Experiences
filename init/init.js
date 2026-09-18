const sampleListings = [
  {
    title: "Why Real Madrid Continues to Dominate European Football",
    description:
      "A deep dive into Real Madrid's winning culture, Champions League legacy, tactical flexibility, legendary players, and why many fans consider them the greatest football club in history.",
    image: {
      url: "https://imgs.search.brave.com/70-OMMMNirsfsctPIL_5PhqlH-SaGIX1-F69VuwC-AU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvcmVh/bC1tYWRyaWQtY29v/bC1hcnQtZHc2M3Ay/a2txa3NmejA4cC5q/cGc",
      filename: "synthetic-real-madrid"
    },
    category: "Sports"
  },

  {
    title: "Artificial Intelligence: The Biggest Technological Shift Since the Internet",
    description:
      "Explore how generative AI is transforming education, healthcare, software engineering, business, and creativity while also raising concerns about jobs, privacy, and regulation.",
    image: {
      url: "https://imgs.search.brave.com/CM0uuJH_h3JZOwpPNwsYvnovPggMWzO8FdGONtWmRIE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIz/NDkxMzQxMC9waG90/by9jaGF0Z3B0LW9u/LWFwcC1zdG9yZS1k/aXNwbGF5ZWQtb24t/YS1waG9uZS1zY3Jl/ZW4taXMtc2Vlbi1p/bi10aGlzLWlsbHVz/dHJhdGlvbi1waG90/by10YWtlbi1pbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZUhSbGtJRFl2R0Ex/MzNTMFZLYWt2bXg4/MmVNS2hRUUVnSVRY/Ymx5MHc0ST0",
      filename: "synthetic-artificial-intelligence"
    },
    category: "Technology"
  },

  {
    title: "Understanding the Russia–Ukraine Conflict: Causes, Consequences, and the Global Impact",
    description:
      "An overview of the geopolitical background, military developments, humanitarian challenges, sanctions, and how the conflict has affected energy markets and international relations.",
    image: {
      url: "https://imgs.search.brave.com/RlEa6mR1q-XJEUHgvNSwDGlCgroHy1iPpG9ojFi5j6g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ2/ODkyNjA4OC9waG90/by9mbGFnLW9mLXVr/cmFpbmUtYW5kLXJ1/c3NpYS1wYWludGVk/LW9uLWEtYnJpY2st/d2FsbC13aXRoLXNv/bGRpZXJzLXJlbGF0/aW9uc2hpcC1iZXR3/ZWVuLXVrcmFpbmUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUZsejNnb3BncDFk/MHczR2FJRTVMY1Zt/dGRsMk5oWWprWF9O/emZfd3pWRWM9",
      filename: "synthetic-russia-ukraine"
    },
    category: "World Affairs"
  },

  {
    title: "The India–US Trade Partnership: Opportunities and Challenges",
    description:
      "Discover how growing trade agreements, semiconductor manufacturing, technology partnerships, and defense cooperation are shaping one of the world's most important economic relationships.",
    image: {
      url: "https://imgs.search.brave.com/nl0DIBaMaggnHRpqOLQYrytH5FCtlaj6fYN8eJckE0c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMud2Vmb3J1bS5v/cmcvYXJ0aWNsZS9p/bWFnZS9sYXJnZV94/RUFkcUtzTmp5bl9f/ZjRXVFBLSF9BRmJf/SGJjcHlRZUdpZ1VY/YUNrS3lBLkpQRw",
      filename: "synthetic-india-us-trade"
    },
    category: "Business"
  },

  {
    title: "Virat Kohli vs Steve Smith: Comparing Two Modern Batting Icons",
    description:
      "A balanced comparison of consistency, technique, leadership, adaptability, and impact across formats while appreciating the unique strengths each batter brings to international cricket.",
    image: {
      url: "https://imgs.search.brave.com/DBcF9U5tg8JrT-U4oqLMMrkLiJlLJndCfWcgIaldWDY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cm95YWxjaGFsbGVu/Z2Vycy5jb20vUFJS/Q0IwMS9wdWJsaWMv/c3R5bGVzLzEwNjF4/NzY3X2xhbmRzY2Fw/ZS9wdWJsaWMvMjAy/NC0wOS9HZXR0eUlt/YWdlcy00NjEwNzAz/MzhfMC5qcGc_aXRv/az0xTHRGVEpDaA",
      filename: "synthetic-kohli-steve-smith"
    },
    category: "Cricket"
  },

  {
    title: "Manchester United vs Liverpool: The Rivalry That Defines English Football",
    description:
      "Explore the history, iconic matches, legendary players, fan culture, and why this remains one of football's fiercest and most celebrated rivalries.",
    image: {
      url: "https://imgs.search.brave.com/mzgA3JlQOVBZMxF_8TDsV53T5Yt9l57TmezoYFIQ4H4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjYy/MDk1MzAyL3Bob3Rv/L21hbmNoZXN0ZXIt/dW5pdGVkcy1jYXB0/YWluLWZvci10aGUt/bmlnaHQtd2F5bmUt/cm9vbmV5LWxlYWRz/LWhpcy10ZWFtLW91/dC1mb3ItdGhlLWdh/bWUtYWdhaW5zdC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/Uk43TWFFa2ZESFU4/b2MyZkpqamNBZGdl/RUhCSkIxbXFhX0l6/VnE2Um5DND0",
      filename: "synthetic-man-united-liverpool"
    },
    category: "Football"
  },

  {
    title: "Can Open-Source AI Compete with Proprietary Models?",
    description:
      "An analysis of the rapid rise of open-source language models, their advantages, limitations, and whether they can challenge commercial AI systems in the coming years.",
    image: {
      url: "https://imgs.search.brave.com/v_NizY0oM9LLgp4-pa7cms85WaTKc1DLNdjDzrRUVKQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y29kZXJhYmJpdC5h/aS9jb250ZW50L2Fz/c2V0cy9ncHQtNS02/LXNvbC1hbmQtdGVy/cmEtYmVuY2htYXJr/LW1lZGlhLnBuZw",
      filename: "synthetic-open-source-ai"
    },
    category: "AI"
  },

  {
    title: "Climate Change and Extreme Weather: Why Scientists Are Concerned",
    description:
      "Learn how rising global temperatures influence floods, droughts, heatwaves, and storms, along with the scientific evidence supporting long-term climate trends.",
    image: {
      url: "https://imgs.search.brave.com/B5YsflxzCQaBScGLRQy1G2-NHsAO7EZDNN74Kcz0XKE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vY2xpbWF0ZS1j/aGFuZ2UtdGVtcGxh/dGUtYmFja2dyb3Vu/ZC13YWxscGFwZXIt/aWxsdXN0cmF0aW9u/LWNsaW1hdGUtY2hh/bmdlcy1wb2xsdXRp/b24taGVhdC13YXZl/LXdhbGxfNjkwMDkx/LTM4NTUuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw",
      filename: "synthetic-climate-change"
    },
    category: "Science"
  },

  {
    title: "The Future of Programming: Will AI Replace Software Engineers?",
    description:
      "A realistic discussion on how AI coding assistants are changing software development, what skills remain valuable, and why human engineers continue to play a critical role.",
    image: {
      url: "https://imgs.search.brave.com/EbQgxGlFu820XIU03GBOJ2J954ozHWLu5kgWWa9mxfQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/d2hhdHMtY2xhdWRl/LWNvZGUtdjAtZjF2/cm1xYjY0NWxlMS5q/cGVnP3dpZHRoPTY0/MCZjcm9wPXNtYXJ0/JmF1dG89d2VicCZz/PTA1NGZkMzMzYjU2/MjkxZjFkZDZkMjYw/OWZkNDhlYTRkYjU1/NDY3MmI",
      filename: "synthetic-ai-programming"
    },
    category: "Programming"
  },

  {
    title: "Social Media Algorithms: Are They Helping Society or Dividing It?",
    description:
      "An exploration of recommendation algorithms, echo chambers, misinformation, online engagement, and the ethical responsibilities of digital platforms.",
    image: {
      url: "https://imgs.search.brave.com/rXuqi9OxA0el9zpmM1UXEkw3S95M9uOIEnTt0706s-A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudG9paW1nLmNv/bS90aHVtYi9tc2lk/LTEzMzA2MzYyOSxp/bWdzaXplLTU1MTEy/LHdpZHRoLTQwMCxo/ZWlnaHQtMjI1LHJl/c2l6ZW1vZGUtNC9t/YXJrLXp1Y2tlcmJl/cmctMi5qcGc",
      filename: "synthetic-social-media-algorithms"
    },
    category: "Society"
  },

  {
    title: "Marvel vs DC: Two Universes, Two Different Storytelling Styles",
    description:
      "Compare the cinematic universes, comic book history, iconic superheroes, and storytelling philosophies that have kept fans debating for decades.",
    image: {
      url: "https://imgs.search.brave.com/X6vN55cMkE5hi3IFvOxpcC497_jvjJAd97Cs8YDbSBE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZGMuY29tLzIw/MjQtMDIvU01WU1BE/TV8wMV9DNC5qcGc",
      filename: "synthetic-marvel-dc"
    },
    category: "Entertainment"
  },

  {
    title: "The Rise of Electric Vehicles: Revolution or Gradual Evolution?",
    description:
      "Examine how electric vehicles are changing transportation through advances in battery technology, charging infrastructure, government policies, and consumer adoption.",
    image: {
      url: "https://imgs.search.brave.com/4pJjMeqt7bvA6JgcKVON8a-6shRBINtQG_FQEoflXZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aWJlZi5vcmcvYXNz/ZXRzL2ltYWdlcy9l/bGVjdHJpYy12ZWhp/Y2xlLWludmVzdG1l/bnQuanBn",
      filename: "synthetic-electric-vehicles"
    },
    category: "Innovation"
  }
];

module.exports = { data: sampleListings };