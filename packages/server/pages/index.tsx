import { Editor } from "../components/Editor/Editor";
import { prisma } from '@monorepo/prisma'
export default function Page() {
  return (
    <div>

    </div> 
  )
}

export const getServerSideProps = async (context) => {
  // create new post
  const post = await prisma.post.create({
    data: {

    }
  }) 
  
  return {
    redirect: {
      
    } 
  }
}