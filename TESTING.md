# Testing: AI Cover Letter

## Manual Test Cases

### Core Functionality

| # | Feature | Test Case | Expected Result |
|---|---------|-----------|-----------------|
| 1 | Generate Letter | Enter resume + job description | Letter generates |
| 2 | Empty Fields | Tap generate with empty fields | Validation error |
| 3 | Save Letter | Tap save button | Letter saved |
| 4 | Library | View saved letters | Letters displayed |
| 5 | Edit Letter | Tap edit, modify text | Changes saved |
| 6 | Copy | Tap copy button | Confirmation shown |

### Paywall

| # | Feature | Test Case | Expected Result |
|---|---------|-----------|-----------------|
| 7 | View Paywall | Navigate to paywall | Paywall displays |
| 8 | Pricing | View pricing options | Monthly + yearly shown |

### Settings

| # | Feature | Test Case | Expected Result |
|---|---------|-----------|-----------------|
| 9 | Toggle | Switch auto-save toggle | Toggle works |
| 10 | Navigation | Navigate to settings | Settings load |

## Device Testing

- [ ] iPhone 14/15 (iOS 17+)
- [ ] iPhone SE (iOS 16+)
- [ ] Android Pixel (latest)
- [ ] Android Samsung Galaxy (recent)

## Edge Cases

- Very long resume text
- Special characters in job description
- No internet connection
- App backgrounded during generation

## Performance

- Initial load: < 3 seconds
- Letter generation: < 2 seconds
- Navigation: Instant (< 100ms)
