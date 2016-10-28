# maze-gen-backtrack
A HTML5 canvas imperfect maze generator that uses backtracking.

For perfect mazes, change normalProbability in main.js to 1.

It generates imperfect mazes by only connecting to cells that it has already visited at a probability of 1 - normalProbability, so setting normalProbability to 1 will mean that it will never extend into cells that it has already visited.