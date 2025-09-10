import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as fs from "fs";
import { Readable } from "stream";
import { spawn } from "child_process";
import crypto from "crypto";
import { CRYPTO_ALGO, CRYPTO_SECRET } from "src/app.constant";


@Injectable()
export class FileSavingService {

    private streamConnections: Map<string, fs.WriteStream>;

    constructor() {
        this.streamConnections = new Map();
    }

    private createFFmpegTransform() {
        const ffmpeg = spawn("ffmpeg", [
            "-i", "pipe:0",          // input from stdin
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "23",
            "-c:a", "aac",
            "-b:a", "128k",
            "-f", "mp4",
            "-movflags", "frag_keyframe+empty_moov", // 🔑 allow fragmented mp4 over pipe
            "pipe:1",                // output to stdout
        ]);

        // Return duplex stream (stdin is writable, stdout is readable)
        return ffmpeg;
    }

    private runFFmpeg(input: Readable, output: fs.WriteStream) {
        return new Promise<void>((resolve, reject) => {
            const ffmpeg = this.createFFmpegTransform();

            input.pipe(ffmpeg.stdin);
            ffmpeg.stdout.pipe(output);

            ffmpeg.stderr.on("data", (data) => {
                console.error("FFmpeg:", data.toString());
            });

            ffmpeg.on("error", reject);

            ffmpeg.on("close", (code) => {
                if (code === 0) resolve();
                else reject(new Error(`FFmpeg exited with code ${code}`));
            });

            output.on("error", reject);
        });
    }

    private runCrypto(input: Readable, output: fs.WriteStream) {
        return new Promise<void>((resolve, reject) => {
            const key = crypto.createHash("sha256").update(CRYPTO_SECRET).digest(); // derive 32-byte key
            const iv = crypto.randomBytes(16); // initialization vector
            const cipher = crypto.createCipheriv(CRYPTO_ALGO, key, iv);
            output.write(iv);
            input.pipe(cipher).pipe(output);

            cipher.on("error", reject);

            cipher.on("close", (code) => {
                if (code === 0) resolve();
                else reject(new Error(`cipher exited with code ${code}`));
            });

            output.on("error", reject);
        });

    }

    async setAStream(chunk: Readable, uid: string) {
        try {
            const currentStream = this.streamConnections.get(uid);
            if (!currentStream) {
                const newStream = fs.createWriteStream(`uploads/${Date.now()}.mp4`);
                newStream.on("finish", () => {
                    console.log(`File saved for uid ${uid}`);
                    this.streamConnections.delete(uid);
                });

                newStream.on("error", (err) => {
                    console.error(`Error writing file for uid ${uid}:`, err);
                    this.streamConnections.delete(uid);
                });
                this.streamConnections.set(uid, newStream);
            }
            const receivedStatus = await axios.post(`http://localhost:3000/encode?uid=${uid}`, chunk, {
                headers: {
                    'Content-Type': 'application/octet-stream'
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity,
            });
            return receivedStatus.data as { status: boolean; message: string; };
        } catch (error) {
            console.error(error);
            return { status: false, message: "Internal Error Happend!" };
        }
    }

    async encodeAndSave(chunk: Readable, uid: string) {
        try {
            const connectedStream = this.streamConnections.get(uid);
            if (connectedStream) {

                // //##===================moving with a asynchronous way
                //const ffmpeg = this.createFFmpegTransform();
                // chunk.pipe(ffmpeg.stdin);
                // ffmpeg.stdout.pipe(connectedStream);
                // return { status: true, message: "Encoding And Uploading a file, Please Wait...!" };

                // //##===================moving with a pause and play with await and resolving promise
                // //=============##Readble encoded file
                await this.runFFmpeg(chunk, connectedStream);
                // //===========##cannot Readable encoded file
                // await this.runCrypto(chunk,connectedStream);
                return { status: true, message: "Encoded And Uploaded Successfully!" };
            } else {
                return { status: false, message: "Invalid request!" };
            }
        } catch (error) {
            console.error(error);
            return { status: false, message: "Internal Error Happend!" };
        }
    }


}