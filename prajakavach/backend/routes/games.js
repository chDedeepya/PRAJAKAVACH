const express = require('express');
const router = express.Router();
const path = require('path');
const { spawn } = require('child_process');

router.post('/:game', (req, res) => {
  const game = req.params.game;
  const scriptPath = path.join(__dirname, '../../public/ursina', `${game}.py`);
  console.log(`Starting game: ${game}, script: ${scriptPath}`);

  try {
    // Spawn the Python process
    const pythonProcess = spawn('python', [scriptPath], {
      detached: true,
      stdio: 'ignore'
    });

    // Detach the process so it runs independently
    pythonProcess.unref();

    console.log(`Game ${game} process spawned`);
    res.json({ status: `${game} simulation started` });
  } catch (error) {
    console.error('Error starting game:', error);
    res.status(500).json({ error: 'Failed to start game' });
  }
});

module.exports = router;
