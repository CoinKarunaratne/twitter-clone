import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "PLease sign in" });

    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(403).json({ error: { err } });
    }
  }
};

export default handler;
