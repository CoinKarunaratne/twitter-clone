import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in" });
    try {
      const postId = req.query.id;
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ error: { err } });
    }
  }
};

export default handler;
