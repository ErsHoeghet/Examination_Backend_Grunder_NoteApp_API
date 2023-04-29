import express from "express";
import routers from "./routes/routes.js";
import swaggerUI from "swagger-ui-express";
import apiDocs from "./docs/docs.json" assert { type: "json" };

const app = express();
const port = 8000;

app.use(express.json());

app.use('/api/docs', swaggerUI.serve);
app.get('/api/docs', (req, res) => {
  const customCssOptions = {
    customCss: '.models { display: none !important; }',
  };
  res.send(swaggerUI.generateHTML(apiDocs, { ...customCssOptions, defaultModelsExpandDepth: -1 }));
});

app.use('/api', routers);

app.use((req, res) => {
  res.status(404).send({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ success: false, message: 'Invalid JSON syntax' });
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Server started on ${port} port`);
});