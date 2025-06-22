import React from 'react'

const DummyBlog = [
  {
    id: "1",
    title: "Getting Started with React: A Beginner's Guide",
    category: "React",
    read_time_minutes: 5,
    tags: ["React", "JavaScript", "Frontend", "Technical"],
    image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg",
    faq: [
      {
        question: "What is JSX in React and why is it useful?",
        answer:
          "JSX (JavaScript XML) is a syntax extension for JavaScript used in React that allows developers to write HTML-like code directly within JavaScript files. This makes the code more readable and easier to visualize the structure of the component. JSX is compiled into regular JavaScript by tools like Babel before it runs in the browser. Its advantage is that it combines the power of JavaScript with the readability of HTML, making UI code much more expressive and less error-prone."
      },
      {
        question: "What are Functional Components in React?",
        answer:
          "Functional components are JavaScript functions that return React elements. They are simpler than class components and allow you to write components without needing to deal with `this`. With the introduction of React Hooks, functional components can now manage state and side effects, making them powerful and widely preferred in modern React development."
      },
      {
        question: "Why is the Virtual DOM important?",
        answer:
          "The Virtual DOM is a concept where React maintains an in-memory representation of the actual DOM. When changes occur, React first applies them to the Virtual DOM, calculates the minimal difference (diffing), and then updates the real DOM accordingly. This results in better performance, especially in large applications, as unnecessary DOM manipulations are avoided."
      }
    ]
  },
  {
    id: "2",
    title: "The Ultimate Guide to Successful Event Management",
    category: "Event Management",
    read_time_minutes: 6,
    tags: ["Event Planning", "Logistics", "Marketing", "Strategy"],
    image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    faq: [
      {
        question: "Why is post-event feedback essential?",
        answer:
          "Collecting feedback after an event helps organizers understand the attendee experience, identify what worked well, and discover areas for improvement. This data is crucial for improving future events, building stronger relationships with participants, and demonstrating commitment to quality. Feedback can be collected through surveys, interviews, or interactive tools."
      },
      {
        question: "How does technology streamline event management?",
        answer:
          "Technology automates and enhances many aspects of event planning, including online registrations, ticketing, attendee tracking, scheduling, and live streaming. Tools like event management software also offer analytics dashboards to monitor engagement and performance in real-time, helping planners make quick and informed decisions."
      },
      {
        question: "Are hybrid events the future?",
        answer:
          "Hybrid events—those combining physical and virtual experiences—are becoming increasingly popular. They provide flexibility for attendees who cannot travel while still enabling face-to-face interaction for those who can. This approach helps increase reach, improve accessibility, and offer data-rich insights for organizers."
      }
    ]
  },
  {
    id: "3",
    title: "Setting Up a Scalable React App: Best Practices",
    category: "React",
    read_time_minutes: 7,
    tags: ["React", "Architecture", "Performance", "Frontend"],
    image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    faq: [
      {
        question: "What is code splitting and how does it help?",
        answer:
          "Code splitting is a technique that divides your application code into smaller bundles which can be loaded on demand. It reduces the initial loading time of your React app by only loading the necessary code required to render a specific view. Tools like Webpack and dynamic `import()` make this process seamless in modern React setups."
      },
      {
        question: "How does SSR (Server-Side Rendering) improve performance?",
        answer:
          "Server-Side Rendering generates the full HTML content of a page on the server and sends it to the client. This leads to faster initial page loads, especially on slow connections, and is beneficial for SEO since search engines can index fully rendered content. Frameworks like Next.js simplify SSR in React."
      },
      {
        question: "Why should we use modular folder structures?",
        answer:
          "Modular folder structures promote better code organization by grouping related files (like components, styles, and tests) together. This approach improves maintainability, makes it easier to locate files, and allows for scalable development as your application grows."
      }
    ]
  },
  {
    id: "4",
    title: "Backend Development with Node.js: A Practical Approach",
    category: "Backend Development",
    read_time_minutes: 8,
    tags: ["Node.js", "Backend", "APIs", "JavaScript"],
    image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    faq: [
      {
        question: "What are middleware functions in Express.js?",
        answer:
          "Middleware functions in Express are functions that execute during the request-response cycle. They can be used for tasks such as logging, authentication, request parsing, and error handling. Middleware allows you to write reusable, modular logic that can be applied globally or to specific routes in your application."
      },
      {
        question: "Why is Node.js considered non-blocking?",
        answer:
          "Node.js is built on an event-driven, non-blocking I/O model, which allows it to handle multiple operations concurrently without waiting for one to complete before starting another. This is especially beneficial for building scalable network applications, where high concurrency is crucial."
      },
      {
        question: "What is Express.js and how does it help?",
        answer:
          "Express.js is a lightweight web application framework for Node.js that simplifies the process of building server-side applications. It provides a robust set of features for routing, middleware, request handling, and more. Express is highly extensible and widely used in full-stack JavaScript applications."
      }
    ]
  },
  {
    id: "5",
    title: "Mastering State Management in React with Redux",
    category: "React",
    read_time_minutes: 10,
    tags: ["React", "Redux", "State Management", "Frontend"],
    image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    faq: [
      {
        question: "What is a Redux reducer?",
        answer:
          "A reducer is a pure function in Redux that takes the current state and an action as input and returns a new state. It determines how the application's state should change in response to an action. Reducers must be predictable and should not mutate the state directly. Instead, they should return a new object representing the updated state."
      },
      {
        question: "When should Redux be preferred over Context API?",
        answer:
          "Redux is best suited for large-scale applications where state is complex and needs to be shared across many components. It provides powerful tools like middleware, time-travel debugging, and a centralized store. In contrast, the Context API is simpler and better suited for smaller apps with limited state management needs."
      },
      {
        question: "What are middleware and how are they used in Redux?",
        answer:
          "Redux middleware are functions that intercept actions before they reach the reducer. They can be used to handle side effects like asynchronous operations (e.g., API calls), logging, error handling, or modifying actions. Common middleware libraries include redux-thunk and redux-saga."
      }
    ]
  },
  {
    id: "6",
    title: "Virtual Events: Planning and Execution Strategies",
    category: "Event Management",
    read_time_minutes: 9,
    tags: ["Virtual Events", "Event Planning", "Digital Marketing", "Engagement"],
    image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    faq: [
      {
        question: "How to increase attendance in virtual events?",
        answer:
          "To boost attendance, promote your event through social media, email marketing, influencer outreach, and partnerships. Offer compelling content, an easy registration process, and clear value propositions. Sending reminders and offering on-demand access afterward can also help attract more participants."
      },
      {
        question: "What are common challenges in virtual events?",
        answer:
          "Common challenges include technical glitches, low engagement, and limited networking opportunities. To overcome these, ensure a reliable platform, prepare contingency plans, use interactive tools like polls and Q&A sessions, and create networking breakout rooms for participants."
      },
      {
        question: "What metrics should be tracked for virtual events?",
        answer:
          "Important metrics include total registrations, live attendance rate, average session duration, engagement (poll responses, chat messages), and post-event feedback. These insights help you evaluate performance and improve future virtual events."
      }
    ]
  }
];


const BlogComponent = () => {
  return (
    <div className='mt-36 p-10 flex justify-center flex-col lg:flex-row gap-10'>
      <div className='w-full lg:w-8/12 flex flex-col gap-8'>
        {DummyBlog.map((blog) => (
          <div
            key={blog.id}
            className='bg-white rounded-xl shadow-md p-6 transition hover:shadow-xl border'
          >
            <img
              src={blog.image_url}
              alt={blog.title}
              className='w-full h-[350px] object-cover rounded-md mb-4'
            />
            <h1 className='text-2xl font-bold mb-2'>{blog.title}</h1>
            <p className='text-gray-600 text-sm mb-3'>
              <span className='font-semibold'>{blog.category}</span> •{' '}
              {blog.read_time_minutes} mins read
            </p>

            <div className='mb-4 flex flex-wrap'>
              {blog.tags.map((tag, index) => (
                <button
                  key={index}
                  className='text-sm px-3 py-1 m-1 bg-slate-100 text-gray-800 rounded-full hover:bg-slate-200'
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className='space-y-3'>
              {blog.faq.map((faqItem, index) => (
                <div
                  key={index}
                  className='bg-gray-50 border-l-4 border-blue-500 p-4 rounded-md'
                >
                  <h2 className='text-lg font-semibold mb-1 text-gray-900'>
                    Q: {faqItem.question}
                  </h2>
                  <p className='text-gray-700'>Ans: {faqItem.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    
    </div>
  )
}



export default BlogComponent