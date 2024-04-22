import Link from 'next/link'
import React from 'react'

function AuthenPage() {
  return (
    <form className='max-w-md mx-auto flex items-center mt-16'>
        <div>
        <h1 className='font-bold text-5xl'>Chào mừng đến với <span className='uppercase text-blue-950'>job search</span> web</h1>
            <div className='m-5'>
                <h3>Tìm việc dễ dàng</h3>
                <h3>Giải quyết mọi vấn đề của các bạn</h3>
            </div>

        <div className="grid grid-cols-2 gap-2">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://static.ybox.vn/2016/06/24/19.jpg" alt='something' />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://dxwd4tssreb4w.cloudfront.net/image/5bdea9e762171677b73d3ba769834c3b" alt='something' />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://jobs365.vn/wp-content/uploads/2021/10/lam-gi-khi-khong-tim-duoc-viec-lam-2.jpg" alt='something' />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://scontent.fsgn22-1.fna.fbcdn.net/v/t1.6435-9/73151575_2742623865772403_4955238957785808896_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9D3Cgac9XvsAb4C1yhH&_nc_ht=scontent.fsgn22-1.fna&oh=00_AfAGf2rmeU262oyPEPJpkY4W_zRx5i2GZiOsaXwxy2kakQ&oe=6642E208" alt='something' />
        </div>



            </div>
        </div>
    </form>
  )
}

export default AuthenPage