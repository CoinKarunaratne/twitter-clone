import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in" });
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    try {
      const { title, postId } = req.body.data;
      if (!title.length) {
        return res.status(401).json({ message: "Please don't comment Empty" });
      }
      const result = await prisma.comment.create({
        data: {
          message: title,
          userId: prismaUser?.id,
          postId,
        },
      });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ error: { err } });
    }
  }
};

export default handler;
