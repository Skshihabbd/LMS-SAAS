import bcrypt from "bcrypt";
import { envVars } from "../config/env";
import { connectDB, disconnectDB } from "../db/ConnectDb";
import { User } from "../modules/user/user.model";

const seedAdmin = async () => {
    try {
        await connectDB();

        const { ADMIN_EMAIL, ADMIN_PASS } = envVars;

        if (!ADMIN_EMAIL || !ADMIN_PASS) {
            throw new Error("ADMIN_EMAIL or ADMIN_PASS is missing in env");
        }

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

        if (existingAdmin) {
            console.log("✅ Admin already exists. Skipping seed.");
            await disconnectDB();
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(ADMIN_PASS, 10);

        // Create admin
        await User.create({
            name: "Admin",
            email: ADMIN_EMAIL,
            password: hashedPassword,
        });

        console.log("🚀 Admin seeded successfully.");

        await disconnectDB();
        process.exit(0);

    } catch (error) {
        console.error("❌ Failed to seed admin:", error);
        await disconnectDB();
        process.exit(1);
    }
};

seedAdmin();
