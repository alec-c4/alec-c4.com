---
title: 'ffmpeg_core'
description: 'Modern Ruby wrapper for FFmpeg with a clean API, hardware acceleration, and proper error handling.'
github: 'https://github.com/alec-c4/ffmpeg_core'
tags: ['FFmpeg', 'Ruby on Rails']
types: ['open-source']
order: 3
---

A modern Ruby wrapper around the FFmpeg command-line tool, built for Ruby 3+ with zero runtime dependencies, thread-safe configuration, and proper error handling.

## Features

- Real-time progress reporting
- Video/audio filters and quality presets
- Hardware acceleration (NVENC, VAAPI, QSV)
- Remote input support (HTTP/HTTPS/RTMP/RTSP)
- Detailed error context on failure
- Thread-safe configuration
- Simple, intuitive API

## Example

```ruby
movie = FFmpegCore::Movie.new("input.mp4")
movie.duration    # => 120.5 (seconds)
movie.resolution  # => "1920x1080"
movie.video_codec # => "h264"

movie.transcode("output.mp4", video_codec: "libx264") do |progress|
  puts "Progress: #{(progress * 100).round(2)}%"
end
```
