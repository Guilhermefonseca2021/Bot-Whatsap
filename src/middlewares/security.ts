import helmet from "helmet";

export default helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: [
        "'self'",
        "http://localhost:3000",
        "ws://localhost:3000"
      ],
    },
  },
});
