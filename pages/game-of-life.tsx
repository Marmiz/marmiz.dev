import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";

const RustComponent = dynamic({
  loader: async () => {
    // Import wasm module
    const { Universe, Cell } = await import("marmiz-wasm-game-of-life");
    const { memory } = await import(
      "marmiz-wasm-game-of-life/marmiz_wasm_game_of_life_bg.wasm"
    );
    // return a React component that uses renderAnimationFrame for the game.
    return () => {
      const universe = Universe.new();
      const width = universe.width();
      const height = universe.height();
      const CELL_SIZE = 48;
      const DEAD_COLOR = "#FFFFFF";
      const ALIVE_COLOR = "#000000";

      const canvasRef = useRef<HTMLCanvasElement>(null!);
      const [animationFrameId, setAnimationId] = useState<number>(0);

      const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        if (frameCount % 60 === 0) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          universe.tick();
          drawGrid(ctx);
          drawCells(ctx);
        }
      };

      const drawGrid = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.strokeStyle = "#CCCCCC";

        // Vertical lines.
        for (let i = 0; i <= width; i++) {
          ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
          ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
        }

        // Horizontal lines.
        for (let j = 0; j <= height; j++) {
          ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
          ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
        }

        ctx.stroke();
      };

      const drawCells = (ctx: CanvasRenderingContext2D) => {
        const cellsPtr = universe.cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

        ctx.beginPath();
        for (let row = 0; row < height; row++) {
          for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

            ctx.fillRect(
              col * (CELL_SIZE + 1) + 1,
              row * (CELL_SIZE + 1) + 1,
              CELL_SIZE,
              CELL_SIZE
            );
          }
        }

        ctx.stroke();
      };

      const getIndex = (row: number, column: number) => {
        return row * width + column;
      };

      const renderLoop = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let frameCount = 0;

        const render = () => {
          if (ctx) {
            frameCount++;
            draw(ctx, frameCount);
            setAnimationId(window.requestAnimationFrame(render));
          }
        };

        render();
      };

      useEffect(() => {
        renderLoop();
        return () => {
          window.cancelAnimationFrame(animationFrameId);
        };
      }, []);

      const stop = () => {
        window.cancelAnimationFrame(animationFrameId);
      };

      const handleCanvasClick = (event: React.MouseEvent) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const boundingRect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / boundingRect.width;
        const scaleY = canvas.height / boundingRect.height;

        const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
        const canvasTop = (event.clientY - boundingRect.top) * scaleY;

        const row = Math.min(
          Math.floor(canvasTop / (CELL_SIZE + 1)),
          height - 1
        );
        const col = Math.min(
          Math.floor(canvasLeft / (CELL_SIZE + 1)),
          width - 1
        );
        if (ctx) {
          console.log(row, col);
          universe.toggle_cell(row, col);

          drawGrid(ctx);
          drawCells(ctx);
        }
      };

      return (
        <div>
          <div className="flex justify-center my-4">
            <button
              className="mx-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => stop()}
            >
              stop
            </button>
            <button
              className="mx-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => renderLoop()}
            >
              play
            </button>
          </div>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            width={600}
            height={600}
            className="mx-auto"
          />
        </div>
      );
    };
  },
  ssr: false,
});

const GOL = () => {
  return (
    <div className="container">
      <h2 className="text-center text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mt-8">
        Game of Life
      </h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        Made with Rust and WebAssembly.
      </p>
      <RustComponent />
    </div>
  );
};

export default GOL;
