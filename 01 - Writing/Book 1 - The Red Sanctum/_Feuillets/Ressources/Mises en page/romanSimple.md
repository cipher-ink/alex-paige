---
version: 2
profile: document
page:
  size: A4
  orientation: portrait
  marginsCm:
    top: 2.5
    bottom: 2.5
    left: 3
    right: 3.5
  mirrorMargins: false
  columns:
    count: 1
    gutterPt: 0
body:
  fontFamily: Baskerville, Georgia, serif
  fontSizePt: 14
  lineHeight: 1.7142857142857142
  align: justify
  firstLineIndentPt: 22
  paragraphSpacingBeforePt: 12
  paragraphSpacingAfterPt: 0
  hyphenation: false
headings:
  h1:
    fontSizePt: 52
    marginTopPt: 72
    marginBottomPt: 72
    align: center
  h2: {}
  h3: {}
  h4: {}
  h5: {}
  h6: {}
blockquote:
  italic: true
  colorHex: "#333333"
sceneDivider: "* * *"
header:
  enabled: true
  left: "{title}"
  center: ""
  right: "{author}"
  distanceCm: 0.75
  bodyGapPt: 3
  differentOddEven: false
footer:
  enabled: true
  left: ""
  center: ""
  right: Page {page} sur {pages}
  distanceCm: 0.75
  bodyGapPt: 3
firstPage:
  hideHeader: true
  pageNumberPosition: right
titlePage:
  styles:
    titre:
      fontSizePt: 21
      align: center
      marginTopPt: 126
      marginBottomPt: 24
    sous-titre:
      fontSizePt: 14
      align: center
      marginBottomPt: 120
    mots:
      fontSizePt: 14
      align: center
      marginBottomPt: 132
    auteur:
      fontSizePt: 14
      align: center
    adresse:
      fontSizePt: 14
      align: center
      marginBottomPt: 36
    coordonnées:
      fontSizePt: 14
      align: center
semanticRoleMarkers: legacy
label: Roman
---
