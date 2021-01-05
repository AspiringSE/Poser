import {
  drawKeyPoints,
  drawSkeleton,
  chidoriPosition,
  rasenganPosition,
  kamehamehaPosition,
  thorPosition,
  flashPosition,
  spiritbombPosition,
  poopPosition
} from './utils'
import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import Chidori from './Chidori'
import Rasengan from './Rasengan'
import Kamehameha from './Kamehameha'
import Thor from './Thor'
import Flash from './Flash'
import SpiritBomb from './SpiritBomb'
import Poop from './Poop'
import {min} from '@tensorflow/tfjs'

class PoseNet extends Component {
  constructor(props) {
    super(props, PoseNet.defaultProps),
      (this.state = {
        chidoriKeypoints: [],
        rasenganKeypoints: [],
        kamehamehaKeypoints: [],
        thorKeypoints: [],
        flashKeypoints: [],
        spiritbombKeypoints: [],
        poopKeypoints: []
      })
  }

  static defaultProps = {
    videoWidth: 900,
    videoHeight: 600,
    flipHorizontal: true,
    algorithm: 'single-pose',
    showVideo: true,
    showSkeleton: false,
    showPoints: false,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: '#ffadea',
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...'
  }

  getCanvas = elem => {
    this.canvas = elem
  }

  getVideo = elem => {
    this.video = elem
  }

  async componentDidMount() {
    try {
      await this.setupCamera()
    } catch (error) {
      throw new Error(
        'This browser does not support video capture, or this device does not have a camera'
      )
    }

    try {
      this.posenet = await posenet.load()
    } catch (error) {
      throw new Error('PoseNet failed to load')
    } finally {
      setTimeout(() => {
        this.setState({loading: false})
      }, 200)
    }

    this.detectPose()
  }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      )
    }
    const {videoWidth, videoHeight} = this.props
    const video = this.video
    video.width = videoWidth
    video.height = videoHeight

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: videoWidth,
        height: videoHeight
      }
    })

    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    const {videoWidth, videoHeight} = this.props
    const canvas = this.canvas
    const canvasContext = canvas.getContext('2d')

    canvas.width = videoWidth
    canvas.height = videoHeight

    this.poseDetectionFrame(canvasContext)
  }

  poseDetectionFrame(canvasContext) {
    const {
      algorithm,
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      minPartConfidence,
      maxPoseDetections,
      nmsRadius,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth
    } = this.props

    const posenetModel = this.posenet
    const video = this.video

    const findPoseDetectionFrame = async () => {
      let poses = []

      switch (algorithm) {
        case 'multi-pose': {
          poses = await posenetModel.estimateMultiplePoses(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            maxPoseDetections,
            minPartConfidence,
            nmsRadius
          )
          break
        }
        case 'single-pose': {
          const pose = await posenetModel.estimateSinglePose(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride
          )
          poses.push(pose)
          console.log(pose)
          break
        }
      }

      canvasContext.clearRect(0, 0, videoWidth, videoHeight)

      if (showVideo) {
        canvasContext.save()
        canvasContext.scale(-1, 1)
        canvasContext.translate(-videoWidth, 0)
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
        canvasContext.restore()
      }

      poses.forEach(({score, keypoints}) => {
        if (score >= minPoseConfidence) {
          if (showPoints) {
            drawKeyPoints(
              keypoints,
              minPartConfidence,
              skeletonColor,
              canvasContext
            )
          }
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              canvasContext
            )
          }

          if (chidoriPosition(minPoseConfidence, keypoints)) {
            this.setState({
              chidoriKeypoints: keypoints
            })
          } else {
            this.setState({
              chidoriKeypoints: []
            })
          }

          if (rasenganPosition(minPoseConfidence, keypoints)) {
            this.setState({
              rasenganKeypoints: keypoints
            })
          } else {
            this.setState({
              rasenganKeypoints: []
            })
          }

          if (kamehamehaPosition(minPoseConfidence, keypoints)) {
            this.setState({
              kamehamehaKeypoints: keypoints
            })
          } else {
            this.setState({
              kamehamehaKeypoints: []
            })
          }

          if (thorPosition(minPoseConfidence, keypoints)) {
            this.setState({
              thorKeypoints: keypoints
            })
          } else {
            this.setState({
              thorKeypoints: []
            })
          }

          if (flashPosition(minPoseConfidence, keypoints)) {
            this.setState({
              flashKeypoints: keypoints
            })
          } else {
            this.setState({
              flashKeypoints: []
            })
          }

          if (spiritbombPosition(minPoseConfidence, keypoints)) {
            this.setState({
              spiritbombKeypoints: keypoints
            })
          } else {
            this.setState({
              spiritbombKeypoints: []
            })
          }

          if (poopPosition(minPoseConfidence, keypoints)) {
            this.setState({
              poopKeypoints: keypoints
            })
          } else {
            this.setState({
              poopKeypoints: []
            })
          }
        }
      })
      requestAnimationFrame(findPoseDetectionFrame)
    }
    findPoseDetectionFrame()
  }

  handleMove = event => {
    console.log(event.screenX, event.screenY)
  }

  render() {
    const {
      chidoriKeypoints,
      rasenganKeypoints,
      kamehamehaKeypoints,
      thorKeypoints,
      flashKeypoints,
      spiritbombKeypoints,
      poopKeypoints
    } = this.state
    return (
      <div onMouseMove={event => this.handleMove(event)}>
        <div>
          <video id="videoNoShow" playsInline ref={this.getVideo} />
          <canvas className="webcam" ref={this.getCanvas} />
          {chidoriKeypoints[0] && (
            <Chidori
              x={chidoriKeypoints[9].position.x - 175}
              y={chidoriKeypoints[9].position.y - 60}
            />
          )}
          {rasenganKeypoints[0] && (
            <Rasengan
              x={rasenganKeypoints[9].position.x - 100}
              y={rasenganKeypoints[9].position.y + 25}
            />
          )}
          {kamehamehaKeypoints[0] && (
            <Kamehameha
              x={kamehamehaKeypoints[9].position.x + 90}
              y={kamehamehaKeypoints[9].position.y - 175}
            />
          )}
          {thorKeypoints[0] && <Thor x={0} y={0} />}
          {flashKeypoints[0] && (
            <Flash
              x={flashKeypoints[0].position.x - 450}
              y={flashKeypoints[0].position.y}
            />
          )}
          {spiritbombKeypoints[0] && (
            <SpiritBomb
              x={spiritbombKeypoints[9].position.x - 250}
              y={spiritbombKeypoints[9].position.y - 300}
            />
          )}
          {poopKeypoints[0] && (
            <Poop
              x={poopKeypoints[12].position.x - 150}
              y={poopKeypoints[12].position.y}
            />
          )}
        </div>
      </div>
    )
  }
}

export default PoseNet
