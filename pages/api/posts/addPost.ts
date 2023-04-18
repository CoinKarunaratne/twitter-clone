import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "PLease sign in to make a post" });
    const title: string = req.body.title;
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });
    if (title.length > 300)
      return res.status(403).json({ message: "Please write a shorter Post" });
    if (!title.length)
      return res.status(403).json({ message: "Please do not post empty." });

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ error: { err } });
    }
  }
};

export default handler;
