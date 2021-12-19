import { useState, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from '../hooks/useSongInfo';
import { SwitchHorizontalIcon, HeartIcon, VolumeUpIcon, ReplyIcon } from '@heroicons/react/outline';
import { RewindIcon, FastForwardIcon, PauseIcon, PlayIcon } from '@heroicons/react/solid';
import { debounce } from 'lodash';

const Player = () => {
    const spotifyApi = useSpotify();
    const {data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                setCurrentTrackId(data.body?.item?.id);
                console.log("Now playing: ", data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackIdState, spotifyApi, session]);

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);

    const debouncedAdjustVolume = useCallback(
        debounce(volume => {
            spotifyApi.setVolume(volume).catch(err => {})
        }, 500),
        []
    );

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    }

    return (
        <div className="py-6 px-6 text-white flex justify-between bg-[#181818] border-t border-[#282828] text-sm md:text-base ">
            <div className='flex space-x-4'>
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p className='text-sm text-gray-500'>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            <div className='flex justify-evenly items-center space-x-4'>
                <SwitchHorizontalIcon className='button' />
                <RewindIcon className='button' onClick={() => spotifyApi.skipToPrevious()}/>
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className='button w-10 h-10' />   
                ) : (
                    <PlayIcon onClick={handlePlayPause} className='button w-10 h-10' />
                )}
                <FastForwardIcon className='button' onClick={() => spotifyApi.skipToNext()}/>
                <ReplyIcon className='button' />
            </div>
            <div className='flex items-center space-x-3'>
                <VolumeUpIcon className="button" onClick={() => volume > 0 && setVolume(volume - 10)}/>
                <input className="w-14 md:w-28" type="range" onChange={(e) => setVolume(Number(e.target.value))} value={volume} min={0} max={100}/>
                <VolumeUpIcon className="button" onClick={() => volume < 100 && setVolume(volume + 10)}/>
            </div>
        </div>
    )
}

export default Player
