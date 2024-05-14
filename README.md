<h1 align="center">Say Hello to <a href="https://preve.onrender.com/">Preve</a>
</h1>
 <img width="1000" alt="header image" src="/header.png">

### **Key Features:**

* **Upload PDFs:** Simply drag and drop your PDF files into Preve to get started.
* **Conversational AI:** Ask Preve questions about your document.
* **Information Retrieval:** Get summaries, key points, and specific details highlighted within the PDF.
* **Clarification and Insights:** Preve can clarify confusing passages and offer insights based on the document's content.

### **How to Use Preve:**

1. **Upload your PDF:** Drag and drop your file or use the upload button.
2. **Start Chatting:** Type your question in the chat window.
3. **Get Answers:** Preve will analyze your document and provide relevant information.

### **Preve is perfect for:**

* Students researching for assignments
* Professionals reviewing contracts and reports
* Anyone who needs to quickly understand the content of a PDF


### **Tech Stack:**

- Nextjs
- Uploadthing
- Postgres
- Prisma
- Tailwind
- Clerk
- Gemini 

### **Setting up locally**

```bash
npm install
```

Change `.env.example` to `.env` and `.env.local.example` to `.env.local` , then add the PostgreSQL url (you can get one for free from NeonDB) and clerk & uploadthing keys and grab the Gemini api key.

And then run :
```bash
npm run dev
```
