import { Remotepigai } from "pigai";

const pigai = new Remotepigai("ws://localhost:3000");

pigai.on("open", async () => {
  console.log("Connected");
  const response = await pigai.prompt("Write me 100 words story", (token) => {
    process.stdout.write(token);
  });

  console.log(`Total text length: ${response.length}`);
  pigai.close();
});
