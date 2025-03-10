const express = require("express");
const ping = require("ping");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/ping", async (req, res) => {
    const host = req.query.host || "google.com"; // Default to Google
    const startTime = Date.now();

    try {
        const response = await ping.promise.probe(host);
        const latency = Date.now() - startTime;

        if (!response.alive) {
            return res.json({ status: "red", message: "No response ❌", latency: "N/A" });
        }

        let status = latency < 200 ? "green" : "yellow";
        res.json({ status, message: `Response in ${latency}ms`, latency });
    } catch (error) {
        res.json({ status: "red", message: "Ping failed ❌", latency: "N/A" });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));