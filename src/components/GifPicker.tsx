import * as React from "react"

import { useMediaQuery } from "~/hooks/use-media-query"
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer"
import { env } from "~/env"
import { Separator } from "./ui/separator"
import { cn } from "~/lib/utils"

export function GifPicker({ setGif }: { setGif: any }) {
    const [open, setOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [gifs, setGifs] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [showCategories, setShowCategories] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    React.useEffect(() => {
        // fetch gifs
        const fetchCategoriies = async () => {
            const apiKey = env.NEXT_PUBLIC_TENOR_API_KEY
            try {
                setLoading(true)
                const response = await fetch(`https://tenor.googleapis.com/v2/categories?key=${apiKey}&client_key=my_test_app`)
                const data = await response.json()
                setCategories(data.tags)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }
        fetchCategoriies()
    }, [])
    // console.log(categories)

    const fetchGifs = async ({ categoryterm }: any) => {
        const apiKey = env.NEXT_PUBLIC_TENOR_API_KEY
        const q = searchTerm || categoryterm
        try {
            setLoading(true)
            const response = await fetch(`https://tenor.googleapis.com/v2/search?key=${apiKey}&q=${q}&limit=20&client_key=my_test_app`)
            const data = await response.json()
            setGifs(data.results)
            setLoading(false)
            setShowCategories(true)
        } catch (error) {
            console.error(error)
            setLoading(false)
            setShowCategories(true)
        }
    }
    // console.log(gifs)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchTerm(query)
        if (query.length > 2) {
            fetchGifs(query)
            setShowCategories(true)
        }

    }

    const handleCatergoryClick = (category: string) => {
        setSearchTerm(category)
        fetchGifs(category)
        setShowCategories(false)
    }

    const gifClickHandle = (id: string, url: string) => {
        setGif(url)
        return setOpen(false)
    }


    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Select Gif</Button>
                </DialogTrigger>
                {/* // input field for gif search */}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Select GIF</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                        <input type="text" placeholder="Search Tenor" className="w-full p-3 px-4 border-gray-300 rounded-lg" value={searchTerm} onChange={handleSearchChange} />
                        <Separator />
                        {/* //catergories */}
                        <div className={cn(
                            "grid grid-cols-2 gap-3 overflow-y-scroll h-72",
                            { hidden: showCategories }
                        )}>
                            {categories.map((category: any) => (
                                <div key={category?.searchterm} className="hover:border rounded-md h-20 relative text-center" onClick={() => { handleCatergoryClick(category.searchterm) }}>
                                    <img src={category?.image} alt={category?.name} className="w-full h-full rounded-lg" />
                                    <div className="bg-black/60 w-full h-20 absolute top-0 items-center text-center justify-center" >
                                        <p className="flex text-white h-full text-center items-center justify-center">{category?.searchterm}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={cn(
                            { hidden: !showCategories }
                        )}>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div className="grid grid-cols-3 gap-3 overflow-y-scroll h-72">
                                    {gifs?.map((gif: any) => (
                                        <div key={gif?.id} className="hover:border rounded-md h-20 relative text-center" onClick={() => gifClickHandle(gif?.id, gif?.media_formats?.gif?.url)}>
                                            <img src={gif?.media_formats?.gif?.url} alt={gif?.title} className="w-full h-full rounded-lg" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">Select GIF</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Select Gif</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-3 px-2 md:px-0">
                    <input type="text" placeholder="Search Tenor" className="w-full p-3 px-4 border-gray-300 rounded-lg" value={searchTerm} onChange={handleSearchChange} />
                    <Separator />
                    {/* //catergories */}
                    <div className={cn(
                        "grid grid-cols-2 gap-3 overflow-y-scroll h-72",
                        { hidden: showCategories }
                    )}>
                        {categories.map((category: any) => (
                            <div key={category?.searchterm} className="hover:border rounded-md h-20 relative text-center" onClick={() => { handleCatergoryClick(category.searchterm) }}>
                                <img src={category?.image} alt={category?.name} className="w-full h-full rounded-lg" />
                                <div className="bg-black/60 w-full h-20 absolute top-0 items-center text-center justify-center" >
                                    <p className="flex text-white h-full text-center items-center justify-center">{category?.searchterm}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={cn(
                        { hidden: !showCategories }
                    )}>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="grid grid-cols-3 gap-3 overflow-y-scroll h-72">
                                {gifs?.map((gif: any) => (
                                    <div key={gif?.id} className="hover:border rounded-md h-20 relative text-center" onClick={() => gifClickHandle(gif?.id, gif?.media_formats?.gif?.url)}>
                                        <img src={gif?.media_formats?.gif?.url} alt={gif?.title} className="w-full h-full rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
