import { useRecoilValue } from "recoil"
import { playlistAtom } from "../atoms/playlistAtom"
import Song from "./Song";

const Songs = () => {
    const playlist = useRecoilValue(playlistAtom);

    return (
        <div className="px-8 flex-col space-y-1 pb-28 text-white">
            {playlist?.tracks.items.map((track, i) => (
                <Song key={track.track.id} track={track} order={i}/>
            ))}
        </div>
    )
}

export default Songs
