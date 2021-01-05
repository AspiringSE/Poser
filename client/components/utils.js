import * as posenet from '@tensorflow-models/posenet'

const pointRadius = 3

export const config = {
  videoWidth: 900,
  videoHeight: 700,
  flipHorizontal: true,
  algorithm: 'single-pose',
  showVideo: true,
  showSkeleton: true,
  showPoints: true,
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

function toTuple({x, y}) {
  return [x, y]
}

export function drawKeyPoints(
  keypoints,
  minConfidence,
  skeletonColor,
  canvasContext,
  scale = 1
) {
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      const {x, y} = keypoint.position
      canvasContext.beginPath()
      canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
      canvasContext.fillStyle = skeletonColor
      canvasContext.fill()
    }
  })
}

function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale,
  canvasContext
) {
  canvasContext.beginPath()
  canvasContext.moveTo(firstX * scale, firstY * scale)
  canvasContext.lineTo(nextX * scale, nextY * scale)
  canvasContext.lineWidth = lineWidth
  canvasContext.strokeStyle = color
  canvasContext.stroke()
}

export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  canvasContext,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  )

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      canvasContext
    )
  })
}

//if it satisfies the coordinates

export const chidoriPosition = (minPoseConfidence, keypoints) => {
  if (
    keypoints[9].score > minPoseConfidence &&
    keypoints[9].position.x >= 400 &&
    keypoints[9].position.x <= 500 &&
    keypoints[9].position.y >= 400 &&
    keypoints[9].position.y <= 500 &&
    keypoints[10].score > minPoseConfidence &&
    keypoints[10].position.x >= 400 &&
    keypoints[10].position.x <= 500 &&
    keypoints[10].position.y >= 400 &&
    keypoints[10].position.y <= 500
  ) {
    return true
  } else {
    return false
  }
}

export const rasenganPosition = (minPoseConfidence, keypoints) => {
  if (
    keypoints[9].score > minPoseConfidence &&
    keypoints[9].position.x >= 450 &&
    keypoints[9].position.x <= 550 &&
    keypoints[9].position.y >= 300 &&
    keypoints[9].position.y <= 400 &&
    keypoints[10].score > minPoseConfidence &&
    keypoints[10].position.x >= 400 &&
    keypoints[10].position.x <= 500 &&
    keypoints[10].position.y >= 400 &&
    keypoints[10].position.y <= 500
  ) {
    return true
  } else {
    return false
  }
}

export const kamehamehaPosition = (minPoseConfidence, keypoints) => {
  if (
    keypoints[9].score > minPoseConfidence &&
    keypoints[9].position.x >= 350 &&
    keypoints[9].position.x <= 450 &&
    keypoints[9].position.y >= 150 &&
    keypoints[9].position.y <= 250 &&
    keypoints[10].score > minPoseConfidence &&
    keypoints[10].position.x >= 350 &&
    keypoints[10].position.x <= 450 &&
    keypoints[10].position.y >= 150 &&
    keypoints[10].position.y <= 250
  ) {
    return true
  } else {
    return false
  }
}

export const thorPosition = (minPoseConfidence, keypoints) => {
  if (
    keypoints[9].score > minPoseConfidence &&
    keypoints[9].position.x >= 700 &&
    keypoints[9].position.x <= 800 &&
    keypoints[9].position.y >= 100 &&
    keypoints[9].position.y <= 200
  ) {
    return true
  } else {
    return false
  }
}

export const flashPosition = (minPoseConfidence, keypoints) => {
  if (
    keypoints[9].score > minPoseConfidence &&
    keypoints[9].position.x >= 550 &&
    keypoints[9].position.x <= 650 &&
    keypoints[9].position.y >= 300 &&
    keypoints[9].position.y <= 400 &&
    keypoints[10].score > minPoseConfidence &&
    keypoints[10].position.x >= 200 &&
    keypoints[10].position.x <= 300 &&
    keypoints[10].position.y >= 300 &&
    keypoints[10].position.y <= 400
  ) {
    return true
  } else {
    return false
  }
}

export const spiritbombPosition = (minPoseConfidence, keypoints) => {
  if (
    keypoints[9].score > minPoseConfidence &&
    keypoints[9].position.x >= 500 &&
    keypoints[9].position.x <= 600 &&
    keypoints[9].position.y >= 50 &&
    keypoints[9].position.y <= 150 &&
    keypoints[10].score > minPoseConfidence &&
    keypoints[10].position.x >= 300 &&
    keypoints[10].position.x <= 400 &&
    keypoints[10].position.y >= 50 &&
    keypoints[10].position.y <= 150
  ) {
    return true
  } else {
    return false
  }
}

export const poopPosition = (minPoseConfidence, keypoints) => {
  if (
    keypoints[12].score > minPoseConfidence &&
    keypoints[12].position.x >= 300 &&
    keypoints[12].position.x <= 400 &&
    keypoints[12].position.y >= 400 &&
    keypoints[12].position.y <= 500 &&
    keypoints[13].score > minPoseConfidence &&
    keypoints[13].position.x >= 400 &&
    keypoints[13].position.x <= 500 &&
    keypoints[13].position.y >= 400 &&
    keypoints[13].position.y <= 500
  ) {
    return true
  } else {
    return false
  }
}
