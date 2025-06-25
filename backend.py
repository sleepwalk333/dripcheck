from fastapi import FastAPI
from playwright.sync_api import sync_playwright
from selectolax.parser import HTMLParser

app = FastAPI()

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
}

def fetch_html(url: str) -> HTMLParser:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(user_agent=HEADERS["User-Agent"])
        page = context.new_page()
        page.goto(url, timeout=60000)
        page.wait_for_timeout(5000)
        content = page.content()
        browser.close()
        return HTMLParser(content)

def scrape_ebay(query="designer clothing"):
    url = f"https://www.ebay.com/sch/i.html?_nkw={query.replace(' ', '+')}"
    html = fetch_html(url)
    items = html.css("li.s-item")
    results = []
    for item in items[:10]:
        title = item.css_first("h3.s-item__title")
        price = item.css_first("span.s-item__price")
        link = item.css_first("a.s-item__link")
        img = item.css_first("img.s-item__image-img")
        results.append({
            "title": title.text(strip=True) if title else None,
            "price": price.text(strip=True) if price else None,
            "image": img.attributes.get("src") if img else None,
            "link": link.attributes.get("href") if link else None
        })
    return results

def scrape_vinted():
    url = "https://www.vinted.de/vetements?search_text=designerclothing"
    html = fetch_html(url)
    items = html.css("div.feed-grid__item")
    results = []
    for item in items[:10]:
        title = item.css_first("div.title__text")
        price = item.css_first("span.price__amount")
        link = item.css_first("a")
        img = item.css_first("img")
        results.append({
            "title": title.text(strip=True) if title else None,
            "price": price.text(strip=True) if price else None,
            "image": img.attributes.get("src") if img else None,
            "link": "https://www.vinted.de" + link.attributes.get("href") if link else None
        })
    return results

@app.get("/ebay")
def api_ebay(query: str = "designer clothing"):
    return scrape_ebay(query)

@app.get("/vinted")
def api_vinted():
    return scrape_vinted()

